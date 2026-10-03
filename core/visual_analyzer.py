"""AI visual planning with structured, chunked Gemini responses."""

import asyncio
import json
import re

from pydantic import BaseModel, Field

from config import config
from core.script_parser import Script


class VisualBiblePlan(BaseModel):
    style: str = ""
    color_palette: str = ""
    lighting_language: str = ""
    camera_language: str = ""
    texture: str = ""
    global_negative_prompt: str = ""


class CharacterPlan(BaseModel):
    id: str
    appearance_signature: str = ""
    wardrobe: str = ""
    identity_markers: list[str] = Field(default_factory=list)
    consistency_rules: list[str] = Field(default_factory=list)


class GlobalVisualPlan(BaseModel):
    visual_bible: VisualBiblePlan = Field(default_factory=VisualBiblePlan)
    characters: list[CharacterPlan] = Field(default_factory=list)


class ScenePlan(BaseModel):
    id: str
    visible_character_ids: list[str] = Field(default_factory=list)
    shot_type: str = ""
    composition: str = ""
    lighting: str = ""
    action_beats: list[str] = Field(default_factory=list)
    continuity: list[str] = Field(default_factory=list)
    negative_prompt: str = ""


class SceneBatchPlan(BaseModel):
    scenes: list[ScenePlan] = Field(default_factory=list)


def _is_network_failure(value: object) -> bool:
    message = str(value).lower()
    return any(marker in message for marker in (
        "cannot connect", "connection attempts failed", "clientconnectorerror",
        "access is denied", "name resolution", "dns", "network is unreachable",
    ))


def ensure_visual_defaults(script: Script) -> Script:
    """Give old projects useful deterministic fields when AI is unavailable."""
    previous = None
    for scene in script.scenes:
        if not scene.visible_character_ids:
            scene.visible_character_ids = list(dict.fromkeys(d.character for d in scene.dialogues))
            searchable = " ".join(filter(None, [scene.setting, scene.narration.text if scene.narration else ""])).lower()
            for character in script.characters:
                if character.name.lower() in searchable and character.id not in scene.visible_character_ids:
                    scene.visible_character_ids.append(character.id)
        scene.shot_type = scene.shot_type or scene.camera.split(",", 1)[0].strip() or "Medium shot"
        scene.composition = scene.composition or "balanced cinematic composition using the rule of thirds"
        scene.lighting = scene.lighting or script.visual_bible.lighting_language
        if not scene.action_beats:
            scene.action_beats = [d.action for d in scene.dialogues if d.action]
        if previous and not scene.continuity:
            scene.continuity = [
                "preserve every recurring character's exact identity and wardrobe",
                "maintain story time, props and spatial logic from the previous shot",
            ]
        scene.negative_prompt = scene.negative_prompt or "identity drift, wardrobe change, discontinuous props, inconsistent lighting"
        previous = scene

    for character in script.characters:
        character.appearance_signature = character.appearance_signature or character.description
        character.consistency_rules = character.consistency_rules or [
            "same face, age, hairstyle, body proportions and skin tone in every shot",
            "same wardrobe and accessories until the script explicitly changes them",
        ]
    return script


def _model_candidates() -> list[str]:
    result = []
    for name in (
        config.GEMINI_MODEL,
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-3.7-flash",
        "gemini-3.6-flash",
    ):
        if name and name not in result:
            result.append(name)
    return result


def _parse_response(response, schema: type[BaseModel]) -> BaseModel:
    parsed = getattr(response, "parsed", None)
    if isinstance(parsed, schema):
        return parsed
    if isinstance(parsed, dict):
        return schema.model_validate(parsed)
    text = (response.text or "").strip()
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("Gemini returned no JSON object")
    return schema.model_validate(json.loads(match.group(0)))


async def _generate_structured(client, contents: dict, instruction: str, schema: type[BaseModel]) -> BaseModel:
    from google import genai

    last_error = None
    for model in _model_candidates():
        try:
            response = await client.aio.models.generate_content(
                model=model,
                contents=json.dumps(contents, ensure_ascii=False),
                config=genai.types.GenerateContentConfig(
                    system_instruction=instruction,
                    response_mime_type="application/json",
                    response_schema=schema,
                    max_output_tokens=16384,
                    temperature=0.15,
                ),
            )
            if response:
                return _parse_response(response, schema)
        except Exception as exc:
            last_error = exc
            print(f"[VISUAL AI] Model {model} failed: {type(exc).__name__}: {exc}")
            message = str(exc).lower()
            if _is_network_failure(exc):
                raise RuntimeError(
                    "Không thể kết nối Google Gemini. Hãy kiểm tra mạng, tường lửa hoặc cách ứng dụng được khởi động."
                ) from exc
            if any(value in message for value in ("429", "503", "unavailable", "high demand")):
                await asyncio.sleep(1)
                continue
    raise RuntimeError(str(last_error or "Gemini returned no structured response"))


def _scene_source(scene) -> dict:
    return {
        "id": scene.id,
        "scene_type": scene.scene_type,
        "setting": scene.setting,
        "camera": scene.camera,
        "action_beats": scene.action_beats,
        "dialogues": [
            {"character": d.character, "emotion": d.emotion, "action": d.action, "text": d.text}
            for d in scene.dialogues
        ],
        "narration": scene.narration.text if scene.narration else "",
    }


def _merge_global(script: Script, plan: GlobalVisualPlan) -> None:
    for key, value in plan.visual_bible.model_dump().items():
        if value.strip():
            setattr(script.visual_bible, key, value.strip())
    by_id = {item.id: item for item in plan.characters}
    for character in script.characters:
        item = by_id.get(character.id)
        if not item:
            continue
        character.appearance_signature = item.appearance_signature.strip() or character.appearance_signature
        character.wardrobe = item.wardrobe.strip() or character.wardrobe
        character.identity_markers = [v.strip() for v in item.identity_markers if v.strip()]
        character.consistency_rules = [v.strip() for v in item.consistency_rules if v.strip()]


def _merge_scene_batch(script: Script, plan: SceneBatchPlan, expected_ids: set[str]) -> set[str]:
    valid_characters = {character.id for character in script.characters}
    merged = set()
    by_id = {scene.id: scene for scene in script.scenes}
    for item in plan.scenes:
        if item.id not in expected_ids or item.id not in by_id:
            continue
        scene = by_id[item.id]
        scene.visible_character_ids = [value for value in item.visible_character_ids if value in valid_characters]
        scene.shot_type = item.shot_type.strip() or scene.shot_type
        scene.composition = item.composition.strip() or scene.composition
        scene.lighting = item.lighting.strip() or scene.lighting
        # Preserve beats explicitly written in the script. AI may fill gaps,
        # but must not replace the author's sequence with an invented one.
        if not scene.action_beats:
            scene.action_beats = [value.strip() for value in item.action_beats if value.strip()]
        scene.continuity = [value.strip() for value in item.continuity if value.strip()]
        scene.negative_prompt = item.negative_prompt.strip() or scene.negative_prompt
        merged.add(item.id)
    return merged


async def analyze_visual_consistency(script: Script) -> tuple[Script, bool, str]:
    """Lock global identity once, then analyze scenes in bounded continuity batches."""
    ensure_visual_defaults(script)
    if not config.has_google_api():
        return script, True, "Chưa có Google API key; đã dùng bố cục mặc định có cấu trúc."

    from google import genai

    client = genai.Client(api_key=config.GOOGLE_API_KEY)
    failures = []
    try:
        overview = [
            {
                "id": scene.id,
                "setting": scene.setting[:240],
                "story_text": " ".join(
                    [d.text for d in scene.dialogues] + ([scene.narration.text] if scene.narration else [])
                )[:240],
            }
            for scene in script.scenes
        ]
        global_instruction = """
You are a film production designer and character continuity supervisor.
Return the required JSON schema. Keep every supplied character ID unchanged.
Create one immutable English appearance signature per character with age, ethnicity, build, face shape,
skin tone, eyes and hair. Define concrete wardrobe colors and accessories. Never invent a visible narrator.
Create one coherent project-wide visual bible suitable for photorealistic cinematic image generation.
"""
        try:
            global_plan = await _generate_structured(
                client,
                {
                    "title": script.title,
                    "characters": [
                        {"id": c.id, "name": c.name, "description": c.description}
                        for c in script.characters
                    ],
                    "story_overview": overview,
                },
                global_instruction,
                GlobalVisualPlan,
            )
            _merge_global(script, global_plan)
        except Exception as exc:
            failures.append(f"Character/Visual Bible: {exc}")
            if _is_network_failure(exc) or "không thể kết nối google gemini" in str(exc).lower():
                return (
                    ensure_visual_defaults(script),
                    True,
                    "Không thể kết nối Google Gemini; đã dùng bố cục mặc định. "
                    "Hãy chạy ứng dụng bằng python app.py và kiểm tra tường lửa/mạng.",
                )

        locked_context = {
            "visual_bible": script.visual_bible.model_dump(),
            "characters": [
                {
                    "id": c.id,
                    "name": c.name,
                    "appearance_signature": c.appearance_signature,
                    "wardrobe": c.wardrobe,
                    "identity_markers": c.identity_markers,
                }
                for c in script.characters
            ],
        }
        batch_size = 10
        previous_plan = []
        scene_instruction = """
You are a cinematographer and continuity supervisor. Return the required JSON schema for every supplied scene ID.
Do not change IDs, dialogue, narration, story facts, locked character appearance or wardrobe.
Preserve supplied action_beats exactly and in order. If none are supplied, infer only actions directly
supported by the scene setting, dialogue actions or narration; never add unrelated events or flashbacks.
Choose visible_character_ids only from the supplied character IDs; a narration voice alone is not visible.
Write precise English shot size/lens, screen positions, foreground/background, motivated lighting,
ordered visible action beats, and concrete continuity inherited from earlier scenes.
Vary shot composition while preserving spatial logic, props, time, weather and character state.
"""
        for start in range(0, len(script.scenes), batch_size):
            batch = script.scenes[start:start + batch_size]
            expected = {scene.id for scene in batch}
            try:
                plan = await _generate_structured(
                    client,
                    {
                        **locked_context,
                        "previous_scene_plans": previous_plan[-2:],
                        "scenes": [_scene_source(scene) for scene in batch],
                    },
                    scene_instruction,
                    SceneBatchPlan,
                )
                merged = _merge_scene_batch(script, plan, expected)
                missing = expected - merged
                if missing:
                    failures.append(f"Thiếu bố cục cho {', '.join(sorted(missing))}")
                previous_plan = [item.model_dump() for item in plan.scenes]
            except Exception as exc:
                failures.append(f"Nhóm cảnh {start + 1}-{start + len(batch)}: {exc}")

        ensure_visual_defaults(script)
        if failures:
            overload = any(any(code in item.lower() for code in ("503", "429", "unavailable", "quota")) for item in failures)
            network = any(_is_network_failure(item) or "không thể kết nối google gemini" in item.lower() for item in failures)
            if network:
                reason = "Không thể kết nối Google Gemini"
            elif overload:
                reason = "Gemini đang quá tải"
            else:
                reason = "Một phần phản hồi Gemini chưa đúng schema"
            return script, True, f"{reason}; đã dùng bố cục mặc định cho các phần chưa phân tích ({len(failures)} nhóm)."
        return script, False, ""
    finally:
        await client.aio.aclose()
