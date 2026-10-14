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
    parts = [f"IDENTITY LOCK — {character.name} (ID {character.id}): {identity}"]
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


def _script_requirements(scene: Scene, script: Script) -> list[str]:
    """Keep the video's visible story anchored to this scene's source text."""
    characters = _visible_characters(scene, script)
    names = ", ".join(character.name for character in characters) or "none specified"
    blocks = [
        f"SCRIPT FIDELITY FOR {scene.id}: depict this scene's actual story, setting and events. "
        "The requirements below take priority over decorative camera or style suggestions.",
        f"REQUIRED SETTING AND STORY TIME: {scene.setting}.",
        f"ON-SCREEN NAMED CHARACTERS: {names}. Do not add people or characters absent from this scene.",
    ]
    actions = list(scene.action_beats)
    for dialogue in scene.dialogues:
        if dialogue.action:
            character = script.get_character(dialogue.character)
            action = f"{character.name if character else dialogue.character}: {dialogue.action}"
            if action not in actions:
                actions.append(action)
    if actions:
        blocks.append("REQUIRED VISIBLE ACTIONS IN ORDER: " + " → ".join(actions) + ".")
    if scene.narration and scene.narration.text.strip():
        blocks.append(
            f'SCRIPT NARRATION TO REPRESENT VISUALLY WHERE CONCRETE: "{scene.narration.text.strip()}". '
            "Keep the shot in the stated setting and story time unless the script explicitly changes them."
        )
    for dialogue in scene.dialogues:
        if not dialogue.text.strip():
            continue
        character = script.get_character(dialogue.character)
        name = character.name if character else dialogue.character
        blocks.append(
            f'DIALOGUE CONTEXT — {name} ({dialogue.emotion}): "{dialogue.text.strip()}". '
            "Show the character and emotion in the current scene; dialogue audio is added later."
        )
    if not actions:
        blocks.append(
            "When no explicit physical action is written, show the concrete setting and the visible "
            "change or reaction implied by this scene; do not invent a new plot event."
        )
    blocks.append(
        "EXCLUDE unrelated actions, flashbacks, locations, props, people and story events. "
        "Do not render script text or subtitles on screen."
    )
    return blocks


def _base_blocks(scene: Scene, script: Script) -> list[str]:
    characters = _visible_characters(scene, script)
    blocks = [
        f"Cinematic GLOBAL VISUAL BIBLE: {_visual_style(script)}.",
        *(_character_lock(character) for character in characters),
        f"SCENE: {scene.setting}.",
        f"SHOT AND CAMERA: {scene.shot_type or scene.camera}. {scene.camera}.",
    ]
    location = script.get_location(scene.location_id)
    if location:
        blocks.insert(-1, f"LOCATION LOCK — {location.name} (ID {location.id}): {location.description or scene.setting}. Preserve the same layout, architecture, furniture and fixed props across scenes at this location.")
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
        return "\n\n".join([
            f"Cinematic GLOBAL VISUAL BIBLE: {_visual_style(script)}.",
            *(_character_lock(character) for character in _visible_characters(scene, script)),
            *([f"LOCATION LOCK — {location.name} (ID {location.id}): {location.description or scene.setting}. Preserve the same layout and fixed props."] if (location := script.get_location(scene.location_id)) else []),
            f"USER SHOT DIRECTION: {scene.prompt_override.strip()}",
            *_script_requirements(scene, script),
        ])
    parts = _base_blocks(scene, script)
    parts.extend(_script_requirements(scene, script))
    parts.append("MOTION: stable facial identity, natural human motion, coherent hands, no sudden pose or wardrobe changes.")
    duration = f"{audio_duration:.1f} seconds" if audio_duration > 0 else (scene.duration_hint or "8 seconds")
    parts.append(f"DURATION: approximately {duration}.")
    parts.append(f"AVOID: {_negative_prompt(scene, script)}.")
    return "\n\n".join(parts)


def build_muse_prompt(scene: Scene, script: Script) -> str:
    """Give Muse source material and let Muse plan the shot before generating it."""
    characters = _visible_characters(scene, script)
    location = script.get_location(scene.location_id)
    scene_index = next((index for index, item in enumerate(script.scenes) if item.id == scene.id), -1)
    previous_scene = script.scenes[scene_index - 1] if scene_index > 0 else None

    source_lines = [
        f"Scene ID: {scene.id}",
        f"Story setting and time: {scene.setting}",
    ]
    if scene.action_beats:
        source_lines.append("Actions in story order: " + " -> ".join(scene.action_beats))
    if scene.narration and scene.narration.text.strip():
        source_lines.append(f'Narration to depict visually: "{scene.narration.text.strip()}"')
    for dialogue in scene.dialogues:
        character = script.get_character(dialogue.character)
        name = character.name if character else dialogue.character
        action = f"; visible action: {dialogue.action}" if dialogue.action else ""
        source_lines.append(
            f'Dialogue context: {name}, emotion {dialogue.emotion}{action}: "{dialogue.text.strip()}"'
        )
    if scene.prompt_override.strip():
        source_lines.append(f"User direction that must be followed: {scene.prompt_override.strip()}")

    locks = [
        f"Project visual style: {_visual_style(script)}",
        *(_character_lock(character) for character in characters),
    ]
    if location:
        locks.append(
            f"Location continuity lock: {location.name}: {location.description or scene.setting}. "
            "Keep its architecture, layout, furniture and fixed props unchanged."
        )
    if previous_scene:
        locks.append(
            f"Previous scene continuity: scene {previous_scene.id} was set in {previous_scene.setting}. "
            "Keep story continuity where the source scene requires it."
        )

    return "\n\n".join([
        "MUSE DIRECTOR TASK: Analyze the source scene below yourself, design the strongest cinematic "
        "shot plan and generation prompt internally, then generate the video immediately. Do not stop "
        "after explaining the analysis and do not return prompt text instead of a video.",
        "SOURCE SCENE (this is the authority; do not invent another plot):\n" + "\n".join(source_lines),
        "CONTINUITY LOCKS:\n" + "\n".join(locks),
        "GENERATION RULES: Create one downloadable 16:9 landscape cinematic clip. Select camera, "
        "composition, lighting and natural motion that best communicate this exact scene. Preserve every "
        "named character's identity and wardrobe. Show only concrete actions supported by the source. "
        "Dialogue is emotional context; spoken audio will be added later. No captions, text, watermark, "
        "visible logo, unrelated stock footage, flashback or extra person. Produce the video now.",
    ])


def build_image_prompt(scene: Scene, script: Script) -> str:
    """Build a still-image prompt with locked identity and composition."""
    if scene.prompt_override.strip():
        return "\n\n".join([
            f"Cinematic GLOBAL VISUAL BIBLE: {_visual_style(script)}.",
            *(_character_lock(character) for character in _visible_characters(scene, script)),
            *([f"LOCATION LOCK — {location.name} (ID {location.id}): {location.description or scene.setting}. Preserve the same layout and fixed props."] if (location := script.get_location(scene.location_id)) else []),
            f"USER SHOT DIRECTION: {scene.prompt_override.strip()}",
            *_script_requirements(scene, script),
        ])
    parts = _base_blocks(scene, script)
    parts.extend(_script_requirements(scene, script))
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
