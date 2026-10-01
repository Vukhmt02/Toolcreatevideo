"""Deterministic prompts built from the project's visual and character bibles."""

from core.script_parser import Character, Scene, Script


def _visible_characters(scene: Scene, script: Script) -> list[Character]:
    ids = list(scene.visible_character_ids)
    for dialogue in scene.dialogues:
        if dialogue.character not in ids:
            ids.append(dialogue.character)
    return [character for cid in ids if (character := script.get_character(cid))]


def _character_lock(character: Character) -> str:
    identity = character.appearance_signature or character.description
    parts = [f"IDENTITY LOCK — {character.name}: {identity}"]
    if character.wardrobe:
        parts.append(f"Wardrobe lock: {character.wardrobe}")
    if character.identity_markers:
        parts.append("Immutable identity markers: " + "; ".join(character.identity_markers))
    rules = character.consistency_rules or [
        "preserve the exact same face, age, hairstyle, body proportions and skin tone",
        "do not change clothing or accessories within the sequence",
    ]
    parts.append("Consistency: " + "; ".join(rules))
    return ". ".join(part.strip(" .") for part in parts if part) + "."


def _visual_style(script: Script) -> str:
    bible = script.visual_bible
    return "; ".join(filter(None, [
        bible.style,
        bible.color_palette,
        bible.lighting_language,
        bible.camera_language,
        bible.texture,
        f"{script.settings.aspect_ratio} frame",
    ]))


def _negative_prompt(scene: Scene, script: Script) -> str:
    values = [script.visual_bible.global_negative_prompt, scene.negative_prompt]
    return "; ".join(value.strip(" ;") for value in values if value)


def _story_context(scene: Scene, script: Script) -> str:
    """Preserve the scene's actual narrative meaning in every generated prompt."""
    moments = []
    if scene.narration and scene.narration.text.strip():
        moments.append(f'Narration: "{scene.narration.text.strip()}"')
    for dialogue in scene.dialogues:
        character = script.get_character(dialogue.character)
        name = character.name if character else dialogue.character
        text = dialogue.text.strip()
        if text:
            moments.append(f'{name} ({dialogue.emotion}): "{text}"')
    return " ".join(moments)


def _base_blocks(scene: Scene, script: Script) -> list[str]:
    characters = _visible_characters(scene, script)
    blocks = [
        f"Cinematic GLOBAL VISUAL BIBLE: {_visual_style(script)}.",
        *(_character_lock(character) for character in characters),
        f"SCENE: {scene.setting}.",
        f"SHOT AND CAMERA: {scene.shot_type or scene.camera}. {scene.camera}.",
    ]
    story_context = _story_context(scene, script)
    if story_context:
        blocks.append(
            "STORY MOMENT TO VISUALIZE (semantic context only; do not render this text as captions): "
            + story_context
        )
    if scene.composition:
        blocks.append(f"COMPOSITION: {scene.composition}.")
    if scene.lighting:
        blocks.append(f"LIGHTING: {scene.lighting}.")
    if scene.continuity:
        blocks.append("CONTINUITY FROM PREVIOUS SHOT: " + "; ".join(scene.continuity) + ".")
    return blocks


def build_scene_prompt(scene: Scene, script: Script, audio_duration: float = 0) -> str:
    """Build a motion-focused Veo prompt while keeping identity blocks verbatim."""
    if scene.prompt_override.strip():
        return scene.prompt_override.strip()
    parts = _base_blocks(scene, script)
    action_beats = list(scene.action_beats)
    for dialogue in scene.dialogues:
        character = script.get_character(dialogue.character)
        name = character.name if character else dialogue.character
        if dialogue.action:
            action_beats.append(f"{name} {dialogue.action}")
        action_beats.append(f"{name} speaks with a {dialogue.emotion} expression and natural restrained body movement")
    if action_beats:
        parts.append("ACTION BEATS IN ORDER: " + " → ".join(action_beats) + ".")
    parts.append("MOTION: stable facial identity, natural human motion, coherent hands, no sudden pose or wardrobe changes.")
    duration = f"{audio_duration:.1f} seconds" if audio_duration > 0 else (scene.duration_hint or "8 seconds")
    parts.append(f"DURATION: approximately {duration}.")
    parts.append(f"AVOID: {_negative_prompt(scene, script)}.")
    return "\n\n".join(parts)


def build_image_prompt(scene: Scene, script: Script) -> str:
    """Build a still-image prompt with locked identity and composition."""
    if scene.prompt_override.strip():
        return scene.prompt_override.strip()
    parts = _base_blocks(scene, script)
    actions = list(scene.action_beats)
    for dialogue in scene.dialogues:
        character = script.get_character(dialogue.character)
        name = character.name if character else dialogue.character
        if dialogue.action:
            actions.append(f"{name} {dialogue.action}")
        if dialogue.emotion:
            actions.append(f"{name} has a {dialogue.emotion} expression")
    if actions:
        parts.append("CAPTURED MOMENT: " + "; ".join(actions) + ".")
    parts.append("OUTPUT: one coherent cinematic still, realistic anatomy, detailed faces, natural depth of field.")
    parts.append("No text, no captions, no watermark.")
    parts.append(f"AVOID: {_negative_prompt(scene, script)}.")
    return "\n\n".join(parts)


def build_character_prompt(character: Character) -> str:
    return " ".join([
        f"Neutral full-body character reference sheet for {character.name}.",
        _character_lock(character),
        "Front three-quarter view, neutral pose, plain background, realistic proportions, highly detailed.",
    ])


def optimize_dialogue_for_lipsync(text: str, max_length: int = 100) -> list[str]:
    if len(text) <= max_length:
        return [text]
    sentences, current = [], ""
    for char in text:
        current += char
        if char in ".!?,;:…" and len(current) >= 20:
            sentences.append(current.strip())
            current = ""
    if current.strip():
        sentences.append(current.strip())
    result, buffer = [], ""
    for sentence in sentences:
        if len(buffer) + len(sentence) <= max_length:
            buffer += (" " if buffer else "") + sentence
        else:
            if buffer:
                result.append(buffer)
            buffer = sentence
    if buffer:
        result.append(buffer)
    return result or [text]
