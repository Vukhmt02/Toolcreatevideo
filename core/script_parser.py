"""
Script Parser — Parse và validate kịch bản (JSON hoặc Text tự nhiên)
Hỗ trợ cả JSON chuẩn, JSON có lỗi cú pháp nhẹ (smart quotes, trailing commas, comments),
và kịch bản dạng văn bản thuần / Markdown (.txt, .md, ChatGPT export, TikTok script...)
tự động nhận diện nhân vật, bối cảnh, góc máy, lời thoại và lời dẫn.
"""

import asyncio
import json
import re
import unicodedata
from typing import Optional
from pydantic import BaseModel, Field, field_validator


def slugify(text: str) -> str:
    """Tạo slug an toàn từ tiếng Việt cho ID (vd: 'Minh Triết' -> 'char_minh_triet')"""
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '_', text) or "char"


def strip_md(text: str) -> str:
    """Làm sạch ký tự markdown (bold, italic, header, bullets)"""
    text = re.sub(r'^#+\s*', '', text)
    text = re.sub(r'^[\*\-\+\•\d\.]+\s*', '', text)
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    text = re.sub(r'__(.*?)__', r'\1', text)
    text = re.sub(r'_(.*?)_', r'\1', text)
    text = re.sub(r'`(.*?)`', r'\1', text)
    return text.strip()


class DialogueLine(BaseModel):
    """Một dòng thoại của nhân vật"""
    character: str = Field(..., description="ID nhân vật (ví dụ: char_01 hoặc tên nhân vật)")
    text: str = Field(..., description="Nội dung lời thoại")
    emotion: str = Field(default="neutral", description="Cảm xúc khi nói")
    action: str = Field(default="", description="Hành động kèm theo")


class Narration(BaseModel):
    """Lời dẫn chuyện / Voice-over"""
    text: str = Field(..., description="Nội dung narration")
    voice: str = Field(default="", description="ID nhân vật đọc, hoặc để trống cho narrator mặc định")
    emotion: str = Field(default="calm", description="Giọng điệu")


class Scene(BaseModel):
    """Một cảnh trong kịch bản"""
    id: str = Field(default="", description="ID cảnh (ví dụ: scene_01)")
    setting: str = Field(..., description="Mô tả bối cảnh")
    location_id: str = Field(default="", description="ID địa điểm dùng chung giữa các cảnh")
    camera: str = Field(default="Medium shot", description="Góc quay camera")
    dialogues: list[DialogueLine] = Field(default_factory=list)
    narration: Optional[Narration] = None
    scene_type: str = Field(default="filler", description="Loại cảnh: 'key' (Veo 3.1) hoặc 'filler' (Imagen 3 + Ken Burns)")
    background_music: str = Field(default="", description="Nhạc nền")
    duration_hint: str = Field(default="", description="Gợi ý thời lượng (ví dụ: 15s)")
    flow_video_path: str = Field(default="", description="Video đã tạo trong Google Flow")
    flow_image_path: str = Field(default="", description="Ảnh đã tạo trong Google Flow")
    generated_media_path: str = Field(default="", description="Media mới nhất từ nhà cung cấp đã chọn")
    generated_media_type: str = Field(default="", description="Loại media: image hoặc video")
    generated_media_provider: str = Field(default="", description="Nhà cung cấp media")
    media_capture_version: str = Field(default="", description="Phiên bản bộ đồng bộ media")
    media_generation_status: str = Field(default="", description="Trạng thái tạo media gần nhất")
    media_generation_error: str = Field(default="", description="Lỗi tạo media gần nhất")
    media_content_check_status: str = Field(default="", description="Kết quả đối chiếu nội dung Muse với kịch bản")
    media_content_check_reason: str = Field(default="", description="Giải thích kết quả đối chiếu nội dung")
    media_content_check_prompt_hash: str = Field(default="", description="Dấu vân tay prompt đã đối chiếu")
    shot_type: str = Field(default="", description="Cỡ cảnh đã khóa")
    composition: str = Field(default="", description="Bố cục và vị trí nhân vật")
    lighting: str = Field(default="", description="Ánh sáng của cảnh")
    action_beats: list[str] = Field(default_factory=list, description="Chuỗi hành động chính")
    continuity: list[str] = Field(default_factory=list, description="Ràng buộc nối với cảnh trước")
    negative_prompt: str = Field(default="", description="Các lỗi hình ảnh cần tránh")
    prompt_override: str = Field(default="", description="Prompt đã được người dùng chỉnh thủ công")
    visible_character_ids: list[str] = Field(default_factory=list, description="Nhân vật thực sự xuất hiện trong khung hình")

    @property
    def has_dialogue(self) -> bool:
        return len(self.dialogues) > 0

    @property
    def has_narration(self) -> bool:
        return self.narration is not None


class Character(BaseModel):
    """Thông tin nhân vật"""
    id: str = Field(..., description="ID nhân vật")
    name: str = Field(..., description="Tên nhân vật")
    description: str = Field(default="", description="Mô tả ngoại hình")
    voice_ref: str = Field(default="", description="Path file audio mẫu giọng")
    voice_gender: str = Field(default="female", description="Giới tính giọng: male/female")
    reference_images: list[str] = Field(default_factory=list, description="Paths ảnh reference")
    appearance_signature: str = Field(default="", description="Mô tả nhận dạng cố định bằng tiếng Anh")
    wardrobe: str = Field(default="", description="Trang phục cố định")
    identity_markers: list[str] = Field(default_factory=list, description="Đặc điểm nhận dạng không được thay đổi")
    consistency_rules: list[str] = Field(default_factory=list, description="Quy tắc giữ nhân vật đồng nhất")


class Location(BaseModel):
    id: str
    name: str
    description: str = ""
    reference_images: list[str] = Field(default_factory=list)


class VisualBible(BaseModel):
    """Phong cách hình ảnh dùng chung cho toàn bộ project."""
    style: str = Field(default="photorealistic cinematic film")
    color_palette: str = Field(default="natural cinematic colors")
    lighting_language: str = Field(default="motivated realistic lighting")
    camera_language: str = Field(default="cinematic composition, natural depth of field")
    texture: str = Field(default="natural skin texture, realistic materials")
    global_negative_prompt: str = Field(
        default="inconsistent identity, different face, extra fingers, deformed hands, duplicate people, text, captions, watermark"
    )


class ScriptSettings(BaseModel):
    """Cài đặt kịch bản"""
    default_language: str = Field(default="vi")
    aspect_ratio: str = Field(default="16:9")
    resolution: str = Field(default="720p")


class Script(BaseModel):
    """Kịch bản hoàn chỉnh"""
    title: str = Field(..., description="Tên kịch bản")
    settings: ScriptSettings = Field(default_factory=ScriptSettings)
    visual_bible: VisualBible = Field(default_factory=VisualBible)
    characters: list[Character] = Field(default_factory=list)
    locations: list[Location] = Field(default_factory=list)
    scenes: list[Scene] = Field(default_factory=list)

    @field_validator("scenes")
    @classmethod
    def validate_scenes(cls, v):
        if not v:
            raise ValueError("Kịch bản phải có ít nhất 1 cảnh (scene)")
        return v

    def get_character(self, char_id: str) -> Optional[Character]:
        """Tìm nhân vật theo ID hoặc tên"""
        char_id_clean = char_id.strip().lower()
        for char in self.characters:
            if char.id.lower() == char_id_clean or char.name.lower() == char_id_clean:
                return char
        return None

    def get_location(self, location_id: str) -> Optional[Location]:
        return next((item for item in self.locations if item.id == location_id), None)

    def get_all_dialogue_texts(self) -> list[dict]:
        """Lấy tất cả lời thoại kèm thông tin nhân vật"""
        results = []
        for scene in self.scenes:
            for dialogue in scene.dialogues:
                char = self.get_character(dialogue.character)
                results.append({
                    "scene_id": scene.id,
                    "character_id": dialogue.character,
                    "character_name": char.name if char else dialogue.character,
                    "text": dialogue.text,
                    "emotion": dialogue.emotion,
                    "voice_gender": char.voice_gender if char else "female",
                    "voice_ref": char.voice_ref if char else "",
                })
            if scene.narration:
                char = self.get_character(scene.narration.voice) if scene.narration.voice else None
                results.append({
                    "scene_id": scene.id,
                    "character_id": scene.narration.voice or "narrator",
                    "character_name": char.name if char else "Người dẫn chuyện",
                    "text": scene.narration.text,
                    "emotion": scene.narration.emotion,
                    "voice_gender": char.voice_gender if char else "female",
                    "voice_ref": char.voice_ref if char else "",
                    "is_narration": True,
                })
        return results


def clean_json_string(text: str) -> str:
    """Làm sạch chuỗi JSON: thay ngoặc kép thông minh, xóa chú thích, xóa dấu phẩy thừa"""
    text = text.replace('\ufeff', '').replace('\u200b', '').strip()

    for q in ['“', '”', '„', '«', '»']:
        text = text.replace(q, '"')
    for q in ['‘', '’', '‚']:
        text = text.replace(q, "'")

    text = re.sub(r'(?m)^\s*//.*$', '', text)
    text = re.sub(r'//[^\n"\']*$', '', text)
    text = re.sub(r'/\*[\s\S]*?\*/', '', text)
    text = re.sub(r',\s*([}\]])', r'\1', text)

    return text.strip()


def _detect_prose_dialogues(paragraphs: list[str], characters_map: dict) -> list[tuple[str, str]]:
    """
    Nhận diện lời thoại dạng văn xuôi: câu trong dấu nháy đôi hoặc
    dạng 'Tên said/hỏi/đáp...'
    Trả về list (speaker_name_or_empty, text)
    """
    results = []
    quote_re = re.compile(r'["\u201c\u201d\u2018\u2019\u00ab\u00bb](.*?)["\u201c\u201d\u2018\u2019\u00ab\u00bb]', re.S)
    for para in paragraphs:
        quotes = quote_re.findall(para)
        for q in quotes:
            q = q.strip()
            if len(q) > 5:
                # Tìm xem có tên nhân vật trước câu ngoặc không
                speaker = ""
                before = para[:para.find('"' + q if '"' + q in para else q)].strip()
                for cname in characters_map:
                    if cname in before.lower()[-30:]:
                        speaker = cname
                        break
                results.append((speaker, q))
    return results


def parse_narrative_story(text: str, max_scenes: int = 10) -> dict:
    """
    Phân tích truyện kể / văn xuôi liền mạch thành các cảnh video.
    - Dòng đầu tiên (ngắn ≤ 100 ký tự) = tiêu đề
    - Tách thành các đoạn bằng dòng trống
    - Gộp các đoạn ngắn liền kề thành cảnh (~3-5 đoạn / cảnh)
    - Tự động phát hiện lời thoại trong dấu ngoặc kép
    - Toàn bộ văn xuôi còn lại = narration (voiceover)
    """
    # Tách theo dòng trống (double newline)
    raw_text = text.replace('\r\n', '\n').replace('\r', '\n')
    raw_blocks = re.split(r'\n{2,}', raw_text)
    blocks = [b.strip() for b in raw_blocks if b.strip()]

    if not blocks:
        raise ValueError("Nội dung kịch bản trống.")

    # Dòng đầu là tiêu đề nếu ngắn
    title = ""
    content_blocks = []
    if blocks and len(blocks[0]) <= 100 and not blocks[0].endswith('.') and len(blocks) > 1:
        title = blocks[0]
        content_blocks = blocks[1:]
    else:
        title = "Kịch bản video"
        content_blocks = blocks

    if not content_blocks:
        content_blocks = [title]
        title = "Kịch bản video"

    # Tổng số blocks nội dung
    total_blocks = len(content_blocks)

    # Tính số cảnh tự động dựa trên độ dài văn bản:
    # Mỗi cảnh nên có khoảng 300-400 ký tự narration (~15-20 giây đọc)
    TARGET_CHARS_PER_SCENE = 350
    total_chars = sum(len(b) for b in content_blocks)
    ideal_scenes = max(3, min(20, round(total_chars / TARGET_CHARS_PER_SCENE)))
    blocks_per_scene = max(1, round(total_blocks / ideal_scenes))

    # Pattern: Tên riêng (1-2 từ, bắt đầu chữ hoa) + động từ nói + "..."
    # Giới hạn tên tối đa 2 từ để tránh match câu văn như 'Nhiều người từng hỏi'
    dialogue_speaker_re = re.compile(
        r'(\b[A-ZÀÁẢÃẠĂẮẶẰẲẴÂẤẬẦẨẪĐÈÉẺẼẸÊẾỆỀỂỄÌÍỈĨỊÒÓỎÕỌÔỐỘỒỔỖƠỚỢỜỞỠÙÚỦŨỤƯỨỰỪỬỮỲÝỶỸỴ]'
        r'[a-zàáảãạăắặằẳẵâấậầẩẫđèéẻẽẹêếệềểễìíỉĩịòóỏõọôốồổỗơớợờởỡùúủũụưứựừửữỳýỷỹỵ]+'
        r'(?:\s[A-ZÀÁẢÃẠĂẮẶẰẲẴÂẤẬẦẨẪĐÈÉẺẼẸÊẾỆỀỂỄÌÍỈĨỊÒÓỎÕỌÔỐỘỒỔỖƠỚỢỜỞỠÙÚỦŨỤƯỨỰỪỬỮỲÝỶỸỴ]'
        r'[a-zàáảãạăắặằẳẵâấậầẩẫđèéẻẽẹêếệềểễìíỉĩịòóỏõọôốồổỗơớợờởỡùúủũụưứựừửữỳýỷỹỵ]+)?\b)'
        r'\s+(?:nói|hỏi|đáp|bảo|thì thầm|hét|kêu|trả lời|thốt lên|thở dài)'
        r'[^"\u201c\u201d]{0,30}["\u201c\u201d](.+?)["\u201c\u201d]',
        re.S | re.I
    )

    characters_map: dict[str, dict] = {}
    full_text_joined = "\n".join(content_blocks)

    # Tìm nhân vật từ lời thoại có dấu nháy kép
    for m in dialogue_speaker_re.finditer(full_text_joined):
        cname = m.group(1).strip()
        cname_lower = cname.lower()
        if cname_lower and cname_lower not in characters_map and len(cname) <= 25:
            gender = "female"
            if re.search(r'\b(ông|anh|chú|nam|trai|bố|cha|con trai)\b', full_text_joined[:500], re.I):
                # Heuristic: check surrounding context for gender
                ctx_idx = full_text_joined.find(cname)
                ctx = full_text_joined[max(0, ctx_idx-100):ctx_idx+100]
                if re.search(r'\b(ông|anh|chú|bố|cha)\b', ctx, re.I):
                    gender = "male"
            characters_map[cname_lower] = {
                "id": f"char_{slugify(cname)}",
                "name": cname,
                "description": f"Nhân vật trong truyện, {cname}",
                "voice_gender": gender,
                "voice_ref": "",
                "reference_images": []
            }

    # Nếu không tìm được nhân vật nào, tạo nhân vật narrator mặc định
    if not characters_map:
        characters_map["narrator"] = {
            "id": "char_narrator",
            "name": "Người dẫn chuyện",
            "description": "Narrator, calm and clear voice, Vietnamese storyteller",
            "voice_gender": "male",
            "voice_ref": "",
            "reference_images": []
        }

    # === Tách văn bản thành các cảnh ===
    # Quy tắc: mỗi cảnh tối đa 8 giây → tối đa ~80 ký tự narration
    # Ước lượng sơ bộ; thời lượng thật được đo từ âm thanh ElevenLabs.
    MAX_CHARS_PER_SCENE = 80  # 8 giây × 10 ký tự/giây

    scenes = []
    scene_num = 0

    _setting_templates = [
        "Cinematic establishing shot, natural lighting, photorealistic 4k",
        "Medium cinematic shot, warm golden lighting, photorealistic 4k",
        "Close-up cinematic shot, dramatic lighting, photorealistic 4k",
        "Wide cinematic shot, atmospheric lighting, photorealistic 4k",
        "Cinematic scene, soft ambient lighting, photorealistic 4k",
        "Dramatic cinematic shot, contrasted lighting, photorealistic 4k",
        "Emotional close-up, soft focus, natural lighting, photorealistic 4k",
        "Cinematic panoramic shot, sunset lighting, photorealistic 4k",
        "Intimate medium shot, warm indoor lighting, photorealistic 4k",
        "Final cinematic shot, epic lighting, photorealistic 4k",
    ]
    _camera_templates = [
        "Slow zoom in, starting wide",
        "Medium shot, gentle pan right",
        "Close-up, slow push in",
        "Wide shot, static",
        "Medium shot, slight tilt up",
        "Dramatic low angle shot",
        "Eye-level medium shot",
        "Aerial establishing shot",
        "Intimate close-up, static",
        "Slow zoom out to wide shot",
    ]

    def _make_scene(narration_text: str, dialogues: list, scene_idx: int, scene_type: str = "filler") -> dict:
        si = scene_idx % len(_setting_templates)
        ci = scene_idx % len(_camera_templates)
        return {
            "id": f"scene_{scene_idx + 1:02d}",
            "scene_type": scene_type,
            "setting": _setting_templates[si],
            "camera": _camera_templates[ci],
            "dialogues": dialogues,
            "narration": {"text": narration_text.strip(), "voice": "", "emotion": "calm"} if narration_text.strip() else None,
            "background_music": "gentle ambient background music",
            "duration_hint": "8s"
        }

    def _split_text_to_chunks(text: str, max_chars: int) -> list[str]:
        """Tách đoạn văn dài thành các chunk <= max_chars, cắt tại câu hoàn chỉnh."""
        if len(text) <= max_chars:
            return [text]
        chunks = []
        remaining = text
        while remaining:
            if len(remaining) <= max_chars:
                chunks.append(remaining)
                break
            # Tìm điểm cắt gần nhất tại dấu câu (. ! ? ...)
            cut = -1
            for punct in ['. ', '! ', '? ', '… ', ', ']:
                pos = remaining.rfind(punct, 0, max_chars)
                if pos > 10:
                    cut = pos + len(punct) - 1
                    break
            if cut < 10:
                # Không có dấu câu → cắt tại khoảng trắng gần nhất
                cut = remaining.rfind(' ', 0, max_chars)
            if cut < 5:
                cut = max_chars
            chunks.append(remaining[:cut + 1].strip())
            remaining = remaining[cut + 1:].strip()
        return [c for c in chunks if c]

    # Xử lý TOÀN BỘ content_blocks — không giới hạn số cảnh
    for block in content_blocks:
        block = block.strip()
        if not block:
            continue

        # Nhận diện lời thoại trong đoạn này
        dialogues_in_block = []
        for m in dialogue_speaker_re.finditer(block):
            cname = m.group(1).strip()
            speech = m.group(2).strip()
            if speech and len(speech) > 3:
                cname_lower = cname.lower()
                if cname_lower not in characters_map:
                    characters_map[cname_lower] = {
                        "id": f"char_{slugify(cname)}",
                        "name": cname,
                        "description": f"Nhan vat {cname}",
                        "voice_gender": "female",
                        "voice_ref": "",
                        "reference_images": []
                    }
                char_info = characters_map[cname_lower]
                dialogues_in_block.append({
                    "character": char_info["id"],
                    "text": speech,
                    "emotion": "neutral",
                    "action": ""
                })

        # Nếu không tìm được dialogue rõ ràng, thử tìm câu trong nháy kép
        if not dialogues_in_block:
            quote_re2 = re.compile(r'["\u201c\u201d](.+?)["\u201c\u201d]', re.S)
            for qm in quote_re2.finditer(block):
                q = qm.group(1).strip()
                if len(q) > 5:
                    before_text = block[:qm.start()].strip()
                    speaker_char = list(characters_map.values())[0] if characters_map else None
                    for cl, ci in characters_map.items():
                        if cl in before_text.lower()[-50:]:
                            speaker_char = ci
                            break
                    if speaker_char:
                        dialogues_in_block.append({
                            "character": speaker_char["id"],
                            "text": q,
                            "emotion": "neutral",
                            "action": ""
                        })

        if dialogues_in_block:
            # Phần trước lời thoại = narration ngắn (nếu có)
            first_quote = re.search(r'["\u201c\u201d]', block)
            pre_narration = ""
            if first_quote and first_quote.start() > 10:
                pre_narration = block[:first_quote.start()].strip()

            # Mỗi dialogue thành 1 cảnh riêng (dialogue ngắn vừa 8 giây)
            if pre_narration:
                for chunk in _split_text_to_chunks(pre_narration, MAX_CHARS_PER_SCENE):
                    scenes.append(_make_scene(chunk, [], scene_num))
                    scene_num += 1

            for dlg in dialogues_in_block:
                # Cắt lời thoại dài thành nhiều cảnh
                speech_chunks = _split_text_to_chunks(dlg["text"], MAX_CHARS_PER_SCENE)
                for j, chunk in enumerate(speech_chunks):
                    d = dict(dlg)
                    d["text"] = chunk
                    scenes.append(_make_scene("", [d], scene_num))
                    scene_num += 1
        else:
            # Toàn bộ là narration — tách thành chunks vừa 8 giây
            for chunk in _split_text_to_chunks(block, MAX_CHARS_PER_SCENE):
                scenes.append(_make_scene(chunk, [], scene_num))
                scene_num += 1

    # === Gộp các cảnh quá ngắn (<20 ký tự) vào cảnh kế tiếp ===
    MIN_SCENE_CHARS = 20
    merged_scenes = []
    pending_text = ""  # Văn bản từ cảnh ngắn chờ gộp

    for sc in scenes:
        # Lấy text của cảnh hiện tại
        if sc["narration"] and sc["narration"]["text"]:
            sc_text = sc["narration"]["text"]
        elif sc["dialogues"]:
            sc_text = sc["dialogues"][0]["text"]
        else:
            sc_text = ""

        if len(sc_text) < MIN_SCENE_CHARS and not sc["dialogues"]:
            # Cảnh quá ngắn và không phải dialogue → gộp vào cảnh tiếp theo
            pending_text = (pending_text + " " + sc_text).strip() if pending_text else sc_text
        else:
            # Ghép pending_text vào đầu cảnh này
            if pending_text and sc["narration"]:
                sc["narration"]["text"] = (pending_text + " " + sc["narration"]["text"]).strip()
                pending_text = ""
            elif pending_text and not sc["narration"]:
                sc["narration"] = {"text": pending_text, "voice": "", "emotion": "calm"}
                pending_text = ""
            merged_scenes.append(sc)

    # Cảnh ngắn cuối cùng (nếu còn) → gộp vào cảnh cuối
    if pending_text and merged_scenes:
        last = merged_scenes[-1]
        if last["narration"]:
            last["narration"]["text"] = (last["narration"]["text"] + " " + pending_text).strip()
        else:
            last["narration"] = {"text": pending_text, "voice": "", "emotion": "calm"}

    # Đánh lại số thứ tự cảnh và phân loại cảnh KEY / FILLER
    total_scenes = len(merged_scenes)
    # Tỷ lệ: chọn khoảng 8-15 cảnh KEY (Veo 3.1) cho toàn bộ câu chuyện dài
    step = max(2, round(total_scenes / 12)) if total_scenes > 8 else 2

    for idx, sc in enumerate(merged_scenes):
        sc["id"] = f"scene_{idx + 1:02d}"
        is_key = (
            idx == 0
            or idx == total_scenes - 1
            or (idx % step == 0)
            or (len(sc.get("dialogues", [])) > 0 and idx % max(1, step // 2) == 0)
        )
        sc["scene_type"] = "key" if is_key else "filler"

    return {
        "title": title,
        "settings": {
            "default_language": "vi",
            "aspect_ratio": "16:9",
            "resolution": "720p"
        },
        "characters": list({c["id"]: c for c in characters_map.values()}.values()),
        "scenes": merged_scenes
    }


def _has_scene_markers(lines: list[str]) -> bool:
    """Kiểm tra xem văn bản có chứa từ khóa phân cảnh không"""
    scene_kw = re.compile(r'^(?:cảnh|scene|phần|đoạn)\s*(\d+|[a-zA-Z0-9_]+)?\s*[:\-\.]', re.I)
    scene_num_kw = re.compile(r'^\d+[\.\:\-]\s*(?:cảnh|scene|phần|đoạn)?\s*.+$', re.I)
    char_dialogue_kw = re.compile(r'^[A-ZÀÁẢÃẠ][^\:]{0,25}\s*:\s*.{5,}$')
    count = 0
    for line in lines[:40]:
        stripped = line.strip()
        if scene_kw.match(stripped) or scene_num_kw.match(stripped) or char_dialogue_kw.match(stripped):
            count += 1
        if count >= 2:
            return True
    return False


def parse_plain_text_script(text: str) -> dict:
    """
    Phân tích thông minh kịch bản viết bằng văn bản thuần (.txt, .md, ChatGPT, kịch bản phân cảnh).
    Hỗ trợ cả Markdown headers (### Cảnh 1), bullet points (- **Bối cảnh:**), TikTok script, voiceover scripts...
    Tự động phát hiện loại văn bản:
      - Nếu có từ khóa phân cảnh (Cảnh 1:, 1., Nhân vật: ...) → dùng parser từ khóa
      - Nếu là văn xuôi/truyện kể liên tục → dùng parse_narrative_story()
    """
    raw_lines = [l.strip() for l in text.splitlines() if l.strip()]
    if not raw_lines:
        raise ValueError("Nội dung kịch bản trống.")

    # Kiểm tra xem có từ khóa phân cảnh không
    if not _has_scene_markers(raw_lines):
        # Văn xuôi / truyện kể — dùng narrative parser
        return parse_narrative_story(text)

    title = ""
    characters_map: dict[str, dict] = {}
    scenes: list[dict] = []
    current_scene: Optional[dict] = None
    in_character_section = False

    # Regex nhận diện các thành phần
    setting_kw = re.compile(r'^(?:bối\s*cảnh|không\s*gian|địa\s*điểm|khung\s*cảnh|setting|location)\s*[:\-]\s*(.*)$', re.I)
    camera_kw = re.compile(r'^(?:góc\s*máy|góc\s*quay|camera|cỡ\s*cảnh|shot)\s*[:\-]\s*(.*)$', re.I)
    action_kw = re.compile(r'^(?:hành\s*động|diễn\s*biến|hình\s*ảnh|mô\s*tả\s*hình\s*ảnh|action|visual)\s*[:\-]\s*(.*)$', re.I)
    music_kw = re.compile(r'^(?:âm\s*nhạc|nhạc\s*nền|nhạc|âm\s*thanh|tiếng\s*động|music|audio|sound|sfx)\s*[:\-]\s*(.*)$', re.I)
    duration_kw = re.compile(r'^(?:thời\s*lượng|thời\s*gian|duration|time)\s*[:\-]\s*(.*)$', re.I)
    narration_kw = re.compile(r'^(?:lời\s*dẫn|người\s*dẫn|dẫn\s*chuyện|dẫn|giọng\s*đọc|lời\s*bình|voice[\s\-_]*over|vo|narrator|narration|thuyết\s*minh)\s*[:\-]\s*(.*)$', re.I)
    dialogue_header_kw = re.compile(r'^(?:lời\s*thoại|thoại|hội\s*thoại|dialogues?|kịch\s*bản\s*chi\s*tiết)\s*[:\-]?\s*$', re.I)
    char_section_kw = re.compile(r'^(?:nhân\s*vật|danh\s*sách\s*nhân\s*vật|characters?|diễn\s*viên|cast)\s*[:\-]?\s*$', re.I)
    title_kw = re.compile(r'^(?:tiêu\s*đề|tên\s*kịch\s*bản|tựa\s*đề|tên\s*video|tên\s*phim|title)\s*[:\-]\s*(.*)$', re.I)
    scene_kw = re.compile(r'^(?:cảnh|scene|phần|đoạn)\s*(\d+|[a-zA-Z0-9_]+)?\s*[:\-\.]?\s*(.*)$', re.I)
    scene_num_kw = re.compile(r'^\d+[\.\:\-]\s*(?:cảnh|scene|phần|đoạn)?\s*(.*)$', re.I)

    for raw_line in raw_lines:
        if raw_line in ('---', '***', '___'):
            in_character_section = False
            continue

        clean = strip_md(raw_line)
        if not clean:
            continue

        # 1. Tiêu đề
        m_title = title_kw.match(clean)
        if m_title and len(m_title.group(1).strip()) > 0:
            title = m_title.group(1).strip()
            continue
        elif not title and not current_scene and not in_character_section:
            if not scene_kw.match(clean) and not char_section_kw.match(clean) and len(clean) <= 100 and not clean.startswith('-'):
                title = clean
                continue

        # 2. Bắt đầu mục Nhân vật
        if char_section_kw.match(clean):
            in_character_section = True
            continue

        # 3. Đang trong mục Nhân vật
        if in_character_section:
            if scene_kw.match(clean) or scene_num_kw.match(clean):
                in_character_section = False
            else:
                if ':' in clean or '-' in clean:
                    parts = re.split(r'[:\-]', clean, maxsplit=1)
                    cname_part = parts[0].strip()
                    cdesc = parts[1].strip() if len(parts) > 1 else ""
                    if 0 < len(cname_part) <= 25:
                        gender = "female"
                        if re.search(r'\b(nam|male|trai|ông|anh|chú)\b', cname_part + " " + cdesc, re.I):
                            gender = "male"
                        clean_name = re.sub(r'\(.*?\)', '', cname_part).strip()
                        if clean_name:
                            cid = f"char_{slugify(clean_name)}"
                            characters_map[clean_name.lower()] = {
                                "id": cid,
                                "name": clean_name,
                                "description": cdesc,
                                "voice_gender": gender,
                                "voice_ref": "",
                                "reference_images": []
                            }
                continue

        # 4. Cảnh mới
        m_sc = scene_kw.match(clean)
        m_sc_num = None if m_sc else scene_num_kw.match(clean)
        if (m_sc or m_sc_num) and not dialogue_header_kw.match(clean):
            in_character_section = False
            if current_scene and not current_scene["dialogues"] and not current_scene["narration"] and current_scene["setting"].startswith("Khung cảnh mở đầu"):
                scenes.pop()

            scene_setting = ""
            if m_sc:
                scene_setting = m_sc.group(2).strip()
            elif m_sc_num:
                scene_setting = m_sc_num.group(1).strip()

            scene_num = len(scenes) + 1
            current_scene = {
                "id": f"scene_{scene_num:02d}",
                "setting": scene_setting or f"Bối cảnh cảnh {scene_num}",
                "camera": "Medium shot",
                "dialogues": [],
                "narration": None,
                "background_music": "",
                "duration_hint": ""
            }
            scenes.append(current_scene)
            continue

        # 5. Nếu chưa có cảnh nào mà đã có nội dung -> tạo cảnh 1
        if not current_scene:
            current_scene = {
                "id": "scene_01",
                "setting": "Khung cảnh mở đầu",
                "camera": "Medium shot",
                "dialogues": [],
                "narration": None,
                "background_music": "",
                "duration_hint": ""
            }
            scenes.append(current_scene)

        # 6. Metadata trong cảnh
        m_set = setting_kw.match(clean)
        if m_set:
            val = m_set.group(1).strip()
            if val:
                current_scene["setting"] = val
            continue

        m_cam = camera_kw.match(clean)
        if m_cam:
            val = m_cam.group(1).strip()
            if val:
                current_scene["camera"] = val
            continue

        m_act = action_kw.match(clean)
        if m_act:
            val = m_act.group(1).strip()
            if val:
                if current_scene["dialogues"] and not current_scene["dialogues"][-1]["action"]:
                    current_scene["dialogues"][-1]["action"] = val
                else:
                    current_scene["setting"] += f" ({val})"
            continue

        m_mus = music_kw.match(clean)
        if m_mus:
            val = m_mus.group(1).strip()
            if val:
                current_scene["background_music"] = val
            continue

        m_dur = duration_kw.match(clean)
        if m_dur:
            val = m_dur.group(1).strip()
            if val:
                current_scene["duration_hint"] = val
            continue

        m_nar = narration_kw.match(clean)
        if m_nar:
            val = m_nar.group(1).strip()
            if val:
                current_scene["narration"] = {
                    "text": val,
                    "voice": "",
                    "emotion": "calm"
                }
            continue

        if dialogue_header_kw.match(clean):
            continue

        # 7. Lời thoại nhân vật
        if ':' in clean or '：' in clean:
            clean_colon = clean.replace('：', ':')
            speaker_part, content = clean_colon.split(':', 1)
            speaker_part = speaker_part.strip()
            content = content.strip()

            forbidden = (
                'bối cảnh', 'không gian', 'địa điểm', 'góc máy', 'góc quay', 'camera',
                'hình ảnh', 'hành động', 'âm nhạc', 'nhạc nền', 'thời lượng', 'thời gian',
                'lời thoại', 'thoại', 'ghi chú', 'lưu ý', 'tiêu đề', 'cảnh'
            )
            if any(speaker_part.lower().startswith(fb) for fb in forbidden):
                continue

            if 0 < len(speaker_part) <= 30 and len(content) > 0:
                emotion = "neutral"
                action = ""
                emo_match = re.search(r'\((.*?)\)', speaker_part)
                if emo_match:
                    meta = emo_match.group(1).strip()
                    emotion = meta
                    speaker_name = re.sub(r'\(.*?\)', '', speaker_part).strip()
                else:
                    speaker_name = speaker_part

                clean_name_key = speaker_name.lower()
                if clean_name_key not in characters_map:
                    gender = "female"
                    if re.search(r'\b(nam|anh|ông|trai|chú)\b', speaker_name, re.I):
                        gender = "male"
                    cid = f"char_{slugify(speaker_name)}"
                    characters_map[clean_name_key] = {
                        "id": cid,
                        "name": speaker_name,
                        "description": f"Nhân vật {speaker_name}",
                        "voice_gender": gender,
                        "voice_ref": "",
                        "reference_images": []
                    }

                char_info = characters_map[clean_name_key]
                current_scene["dialogues"].append({
                    "character": char_info["id"],
                    "text": content,
                    "emotion": emotion,
                    "action": action
                })
                continue

        # 8. Ngoặc đơn (hành động bổ trợ)
        if clean.startswith('(') and clean.endswith(')'):
            act_text = clean[1:-1].strip()
            if current_scene["dialogues"] and not current_scene["dialogues"][-1]["action"]:
                current_scene["dialogues"][-1]["action"] = act_text
            else:
                current_scene["setting"] += f" ({act_text})"
            continue

        # 9. Lời dẫn mặc định cho câu văn tự do
        if not current_scene["dialogues"] and not current_scene["narration"] and len(clean) > 15:
            current_scene["narration"] = {
                "text": clean,
                "voice": "",
                "emotion": "calm"
            }

    if not title:
        title = "Kịch bản video"

    valid_scenes = []
    for s in scenes:
        if s["dialogues"] or s["narration"] or len(s["setting"]) > 15:
            valid_scenes.append(s)

    if not valid_scenes:
        valid_scenes = [{
            "id": "scene_01",
            "setting": "Cảnh quay mở đầu",
            "camera": "Medium shot",
            "dialogues": [],
            "narration": {"text": text[:300], "voice": "", "emotion": "calm"},
            "background_music": "",
            "duration_hint": ""
        }]

    return {
        "title": title,
        "settings": {
            "default_language": "vi",
            "aspect_ratio": "16:9",
            "resolution": "720p"
        },
        "characters": list({c["id"]: c for c in characters_map.values()}.values()),
        "scenes": valid_scenes
    }



def normalize_script_data(data: dict) -> dict:
    """
    Chuẩn hóa dữ liệu kịch bản:
    - Bổ sung ID cho scene nếu thiếu
    - Tự động map tên nhân vật sang char ID
    - Tự động tạo nhân vật nếu trong thoại có nhân vật chưa khai báo
    """
    if not isinstance(data, dict):
        raise ValueError("Dữ liệu kịch bản phải là một đối tượng (object/dict)")

    if "title" not in data or not str(data["title"]).strip():
        data["title"] = "Kịch bản chưa đặt tên"

    if "settings" not in data or not isinstance(data["settings"], dict):
        data["settings"] = {
            "default_language": "vi",
            "aspect_ratio": "16:9",
            "resolution": "720p"
        }

    raw_characters = data.get("characters") or []
    characters_map: dict[str, dict] = {}
    id_counter = 1

    for c in raw_characters:
        if isinstance(c, dict):
            cid = c.get("id") or f"char_{id_counter:02d}"
            cname = c.get("name") or cid
            safe_id = re.sub(r'[^\w-]', '_', cid)
            char_obj = {
                "id": safe_id,
                "name": cname,
                "description": c.get("description", ""),
                "voice_ref": c.get("voice_ref", ""),
                "voice_gender": c.get("voice_gender", "female"),
                "reference_images": c.get("reference_images") or []
                ,"appearance_signature": c.get("appearance_signature", "")
                ,"wardrobe": c.get("wardrobe", "")
                ,"identity_markers": c.get("identity_markers") or []
                ,"consistency_rules": c.get("consistency_rules") or []
            }
            characters_map[safe_id.lower()] = char_obj
            characters_map[cname.lower()] = char_obj
            id_counter += 1

    scenes = data.get("scenes") or []
    if not isinstance(scenes, list) or len(scenes) == 0:
        raise ValueError("Kịch bản phải có danh sách các cảnh (scenes) với ít nhất 1 cảnh.")

    normalized_scenes = []
    for i, s in enumerate(scenes):
        if not isinstance(s, dict):
            continue
        scene_id = re.sub(r"[^\w-]", "_", str(s.get("id") or f"scene_{i + 1:02d}"))
        if any(existing["id"] == scene_id for existing in normalized_scenes):
            scene_id = f"{scene_id}_{i + 1}"
        setting = s.get("setting") or f"Bối cảnh cảnh {i + 1}"
        camera = s.get("camera") or "Medium shot"

        raw_dialogues = s.get("dialogues") or []
        normalized_dialogues = []
        for d in raw_dialogues:
            if not isinstance(d, dict) or not d.get("text"):
                continue
            raw_char = str(d.get("character", "")).strip()

            char_key = raw_char.lower()
            if char_key in characters_map:
                actual_id = characters_map[char_key]["id"]
            else:
                actual_id = f"char_{slugify(raw_char) or f'{id_counter:02d}'}"
                gender = "male" if re.search(r'\b(nam|anh|ông|trai)\b', raw_char, re.I) else "female"
                new_char = {
                    "id": actual_id,
                    "name": raw_char or "Nhân vật",
                    "description": f"Nhân vật {raw_char}",
                    "voice_ref": "",
                    "voice_gender": gender,
                    "reference_images": []
                    ,"appearance_signature": ""
                    ,"wardrobe": ""
                    ,"identity_markers": []
                    ,"consistency_rules": []
                }
                characters_map[char_key] = new_char
                characters_map[actual_id.lower()] = new_char
                id_counter += 1

            normalized_dialogues.append({
                "character": actual_id,
                "text": str(d.get("text", "")).strip(),
                "emotion": str(d.get("emotion", "neutral")).strip(),
                "action": str(d.get("action", "")).strip(),
            })

        raw_narration = s.get("narration")
        normalized_narration = None
        if isinstance(raw_narration, dict) and raw_narration.get("text"):
            voice_speaker = str(raw_narration.get("voice", "")).strip()
            actual_voice = ""
            if voice_speaker:
                vkey = voice_speaker.lower()
                if vkey in characters_map:
                    actual_voice = characters_map[vkey]["id"]
                else:
                    actual_voice = voice_speaker

            normalized_narration = {
                "text": str(raw_narration.get("text", "")).strip(),
                "voice": actual_voice,
                "emotion": str(raw_narration.get("emotion", "calm")).strip(),
            }

        raw_st = str(s.get("scene_type", "")).strip().lower()
        scene_type = raw_st if raw_st in ("key", "filler") else ("key" if i == 0 else "filler")

        normalized_scenes.append({
            "id": scene_id,
            "scene_type": scene_type,
            "setting": setting,
            "location_id": s.get("location_id", ""),
            "camera": camera,
            "dialogues": normalized_dialogues,
            "narration": normalized_narration,
            "background_music": s.get("background_music", ""),
            "duration_hint": s.get("duration_hint", ""),
            "flow_video_path": s.get("flow_video_path", ""),
            "flow_image_path": s.get("flow_image_path", ""),
            "generated_media_path": s.get("generated_media_path", ""),
            "generated_media_type": s.get("generated_media_type", ""),
            "generated_media_provider": s.get("generated_media_provider", ""),
            "media_capture_version": s.get("media_capture_version", ""),
            "media_generation_status": s.get("media_generation_status", ""),
            "media_generation_error": s.get("media_generation_error", ""),
            "media_content_check_status": s.get("media_content_check_status", ""),
            "media_content_check_reason": s.get("media_content_check_reason", ""),
            "media_content_check_prompt_hash": s.get("media_content_check_prompt_hash", ""),
            "shot_type": s.get("shot_type", ""),
            "composition": s.get("composition", ""),
            "lighting": s.get("lighting", ""),
            "action_beats": s.get("action_beats") or [],
            "continuity": s.get("continuity") or [],
            "negative_prompt": s.get("negative_prompt", ""),
            "prompt_override": s.get("prompt_override", ""),
            "visible_character_ids": s.get("visible_character_ids") or [],
        })

    unique_chars = {}
    for c in characters_map.values():
        unique_chars[c["id"]] = c

    data["characters"] = list(unique_chars.values())
    data["scenes"] = normalized_scenes
    if not isinstance(data.get("visual_bible"), dict):
        data["visual_bible"] = {}
    return data


def parse_script(raw_input: str | dict) -> Script:
    """
    Parse kịch bản từ JSON string, Python dict hoặc văn bản thuần (.txt, .md).
    Tự động sửa lỗi cú pháp nhẹ, tự động phát hiện nhân vật và các cảnh.
    Trả về Script object đã validate.
    """
    if isinstance(raw_input, dict):
        data = raw_input
    elif isinstance(raw_input, str):
        cleaned_str = clean_json_string(raw_input)
        is_likely_json = cleaned_str.startswith("{")

        if is_likely_json:
            try:
                data = json.loads(cleaned_str)
            except json.JSONDecodeError as json_err:
                try:
                    data = parse_plain_text_script(raw_input)
                except Exception:
                    raise ValueError(
                        f"Lỗi định dạng JSON: {json_err.msg} (dòng {json_err.lineno}, cột {json_err.colno}). "
                        "Hãy kiểm tra lại dấu ngoặc và dấu phẩy hoặc sử dụng văn bản thuần."
                    )
        else:
            data = parse_plain_text_script(raw_input)
    else:
        raise ValueError("Định dạng kịch bản không hợp lệ.")

    data = normalize_script_data(data)

    try:
        script = Script(**data)
    except Exception as e:
        raise ValueError(f"Kịch bản không đúng cấu trúc: {e}")

    return script


FULL_SCRIPT_TEMPLATE = {
    "title": "Cuộc gặp gỡ mùa đông",
    "settings": {
        "default_language": "vi",
        "aspect_ratio": "16:9",
        "resolution": "720p"
    },
    "characters": [
        {
            "id": "char_01",
            "name": "Minh",
            "description": "Vietnamese man, 30 years old, short black hair, wearing a dark coat, thoughtful expression, cinematic 4k",
            "voice_ref": "",
            "voice_gender": "male",
            "reference_images": []
        },
        {
            "id": "char_02",
            "name": "Lan",
            "description": "Vietnamese woman, 25 years old, long black hair, wearing a white sweater, warm smile, cinematic 4k",
            "voice_gender": "female",
            "voice_ref": "",
            "reference_images": []
        }
    ],
    "scenes": [
        {
            "id": "scene_01",
            "scene_type": "key",
            "setting": "A cozy small coffee shop with warm lighting, rain falling outside the window, afternoon, photorealistic 4k",
            "camera": "Medium shot, slowly zooming in on the two characters sitting at a table",
            "dialogues": [
                {
                    "character": "char_01",
                    "text": "Em có nhớ lần đầu chúng mình gặp nhau không?",
                    "emotion": "nostalgic, gentle voice",
                    "action": "looking out the window, holding a coffee cup"
                },
                {
                    "character": "char_02",
                    "text": "Nhớ chứ. Hôm đó trời cũng mưa như thế này.",
                    "emotion": "warm smile, soft voice",
                    "action": "smiling and tilting head slightly"
                }
            ],
            "narration": None,
            "background_music": "soft piano, rain sounds",
            "duration_hint": "12s"
        },
        {
            "id": "scene_02",
            "scene_type": "filler",
            "setting": "Flashback: An autumn park with golden leaves falling, warm sunlight filtering through trees, cinematic lighting",
            "camera": "Wide shot transitioning to close-up of the two characters meeting for the first time",
            "dialogues": [],
            "narration": {
                "text": "Đó là một ngày thu, khi những chiếc lá cuối cùng rơi xuống. Hai người xa lạ tình cờ gặp nhau trên con đường nhỏ.",
                "voice": "char_01",
                "emotion": "contemplative, calm"
            },
            "background_music": "gentle acoustic guitar, ambient autumn sounds",
            "duration_hint": "10s"
        }
    ]
}


def format_script_to_complete_json(raw_input: str) -> dict:
    """
    Chuẩn hóa kịch bản thành JSON chuẩn và ĐẦY ĐỦ 100% tất cả các trường.
    Nếu đầu vào trống -> trả về FULL_SCRIPT_TEMPLATE.
    Nếu đầu vào có dữ liệu -> parse và tự động bổ sung mọi trường còn thiếu.
    """
    if not raw_input or not str(raw_input).strip():
        return FULL_SCRIPT_TEMPLATE

    script = parse_script(raw_input)
    data = script.model_dump()

    # Đảm bảo settings
    if "settings" not in data or not isinstance(data["settings"], dict):
        data["settings"] = {}
    data["settings"].setdefault("default_language", "vi")
    data["settings"].setdefault("aspect_ratio", "16:9")
    data["settings"].setdefault("resolution", "720p")

    # Đảm bảo từng nhân vật đầy đủ thuộc tính
    if not data.get("characters"):
        data["characters"] = [
            {
                "id": "char_01",
                "name": "Nhân vật chính",
                "description": "Vietnamese person, 25-30 years old, modern casual clothing, natural expression",
                "voice_gender": "female",
                "voice_ref": "",
                "reference_images": []
            }
        ]

    for i, c in enumerate(data.get("characters", [])):
        c.setdefault("id", f"char_{i+1:02d}")
        c.setdefault("name", f"Nhân vật {i+1}")
        gender = c.get("voice_gender") or "female"
        if gender not in ("male", "female"):
            gender = "female"
        c["voice_gender"] = gender
        if not c.get("description"):
            gender_en = "man" if gender == "male" else "woman"
            c["description"] = f"Vietnamese {gender_en}, 25-30 years old, friendly expression, casual modern clothing, photorealistic 4k"
        c.setdefault("voice_ref", "")
        c.setdefault("reference_images", [])

    first_char_id = data["characters"][0]["id"]

    # Đảm bảo từng scene đầy đủ thuộc tính
    total_sc = len(data.get("scenes", []))
    step = max(2, round(total_sc / 12)) if total_sc > 8 else 2

    for i, s in enumerate(data.get("scenes", [])):
        s.setdefault("id", f"scene_{i+1:02d}")
        raw_st = str(s.get("scene_type", "")).strip().lower()
        if raw_st in ("key", "filler"):
            s["scene_type"] = raw_st
        else:
            is_key = (i == 0 or i == total_sc - 1 or i % step == 0)
            s["scene_type"] = "key" if is_key else "filler"

        if not s.get("setting"):
            s["setting"] = f"Cinematic scene {i+1}, beautiful natural lighting, realistic 4k"
        if not s.get("camera"):
            s["camera"] = "Medium shot"
        if not s.get("background_music"):
            s["background_music"] = "gentle ambient background music"
        if not s.get("duration_hint"):
            s["duration_hint"] = "10s"

        # Dialogues
        cleaned_dialogues = []
        for d in s.get("dialogues", []):
            if isinstance(d, dict):
                d.setdefault("character", first_char_id)
                d.setdefault("text", "")
                if not d.get("emotion"):
                    d["emotion"] = "tự nhiên"
                d.setdefault("action", "")
                cleaned_dialogues.append(d)
        s["dialogues"] = cleaned_dialogues

        # Narration
        if s.get("narration"):
            nar = s["narration"]
            if isinstance(nar, dict):
                nar.setdefault("text", "")
                nar.setdefault("voice", "")
                nar.setdefault("emotion", "calm")
            else:
                s["narration"] = None

    return data


async def refine_script_with_ai(raw_text: str) -> dict:
    """
    Sử dụng Google Gemini để chuẩn hóa bất kỳ kịch bản thô nào
    thành cấu trúc JSON điện ảnh hoàn chỉnh cho Veo 3.1 & Imagen 3.
    """
    from config import config
    if not config.has_google_api():
        raise ValueError("Chưa cấu hình Google API Key. Vui lòng nhập API Key tại tab Cài đặt.")

    from google import genai
    client = genai.Client(api_key=config.GOOGLE_API_KEY)

    system_instruction = """
Bạn là đạo diễn và biên kịch video điện ảnh chuyên nghiệp.
Nhiệm vụ của bạn là nhận kịch bản thô hoặc câu chuyện từ người dùng và chuyển đổi thành cấu trúc JSON chuẩn cho hệ thống tạo video AI (Veo 3.1, Imagen 3 & Voice TTS).

YÊU CẦU ĐẦU RA (bắt buộc trả về đúng định dạng JSON hợp lệ, không bọc markdown backticks):
{
  "title": "Tên kịch bản tiếng Việt",
  "settings": {
    "default_language": "vi",
    "aspect_ratio": "16:9",
    "resolution": "720p"
  },
  "characters": [
    {
      "id": "char_01",
      "name": "Tên nhân vật",
      "description": "Mô tả ngoại hình chi tiết bằng TIẾNG ANH để AI vẽ video (ví dụ: Vietnamese young man, 25 years old, athletic build, short black hair, wearing navy jacket)",
      "voice_gender": "male" hoặc "female",
      "voice_ref": "",
      "reference_images": []
    }
  ],
  "scenes": [
    {
      "id": "scene_01",
      "scene_type": "key" hoặc "filler",
      "setting": "Mô tả bối cảnh chi tiết bằng TIẾNG ANH cho video model (ví dụ: Cozy modern coffee shop, warm golden lighting, rain pouring outside the window, cinematic photorealistic 4k)",
      "camera": "Góc quay bằng tiếng Anh (ví dụ: Medium shot slowly zooming in, Cinematic wide shot, Close up)",
      "dialogues": [
        {
          "character": "char_01",
          "text": "Lời thoại bằng TIẾNG VIỆT",
          "emotion": "cảm xúc khi nói (ví dụ: gentle, nostalgic, excited)",
          "action": "hành động kèm theo bằng tiếng Anh (ví dụ: sipping coffee, looking at camera)"
        }
      ],
      "narration": {
        "text": "Lời dẫn chuyện bằng TIẾNG VIỆT (nếu có, nếu không thì null)",
        "voice": "",
        "emotion": "calm"
      },
      "background_music": "mô tả nhạc nền bằng tiếng Anh (ví dụ: soft piano, gentle rain sounds)",
      "duration_hint": "10s"
    }
  ]
}

Lưu ý quan trọng về "scene_type":
- "key": Dành cho các cảnh quan trọng, cao trào, diễn xuất cảm xúc, cảnh mở đầu và kết thúc (được tạo bằng Veo 3.1). Phân bổ khoảng 8-15 cảnh "key" trong toàn bộ câu chuyện.
- "filler": Dành cho các cảnh chuyển tiếp, mô tả phong cảnh, lời dẫn chuyện không lời thoại (được tạo ảnh bằng Imagen 3 + hiệu ứng Ken Burns).
- "setting", "camera", "action", "description" nên viết bằng TIẾNG ANH để mô hình video tạo hình ảnh đẹp và chuẩn nhất.
- "text" trong dialogues và narration giữ nguyên bằng TIẾNG VIỆT để bộ đọc giọng tạo âm thanh tiếng Việt.
- Trả về JSON thuần túy, không thêm bất kỳ văn bản giải thích nào ngoài JSON.
"""

    prompt = f"Hãy chuyển đổi kịch bản sau thành JSON chuẩn:\n\n{raw_text}"

    # Danh sách model thử nghiệm theo thứ tự ưu tiên
    model_preference = getattr(config, "GEMINI_MODEL", "gemini-3.8-flash")
    candidates = [
        model_preference,
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-3.7-flash",
        "gemini-3.6-flash",
    ]
    models_to_try = []
    for m in candidates:
        if m and m not in models_to_try:
            models_to_try.append(m)

    response = None
    last_err = None

    for model_name in models_to_try:
        # Thử tối đa 2 lần cho mỗi model nếu gặp lỗi quá tải 503 / 429
        for attempt in range(2):
            try:
                response = await client.aio.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=genai.types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        response_mime_type="application/json",
                        temperature=0.3,
                    ),
                )
                if response and response.text:
                    break
            except Exception as e:
                last_err = e
                err_msg = str(e).lower()
                print(f"[Gemini Refine] Model '{model_name}' (lần thử {attempt+1}) gặp lỗi: {e}")

                is_overloaded = any(k in err_msg for k in [
                    "503", "unavailable", "high demand", "temporarily",
                    "429", "resource_exhausted", "quota",
                    "500", "internal error", "504", "deadline"
                ])
                is_unsupported = any(k in err_msg for k in [
                    "404", "not_found", "no longer available", "not found"
                ])

                if is_overloaded and attempt == 0:
                    # Chờ 1.5 giây rồi thử lại một lần nữa với cùng model
                    await asyncio.sleep(1.5)
                    continue
                elif is_overloaded or is_unsupported:
                    # Chuyển sang model tiếp theo trong danh sách dự phòng
                    break
                else:
                    # Lỗi nghiêm trọng khác (sai API key,...) -> dừng lại
                    raise e

        if response and response.text:
            break

    # Nếu tất cả các model AI đều bận hoặc không phản hồi, tự động dùng bộ chuẩn hóa kịch bản cục bộ
    if response is None or not response.text:
        print(f"[Gemini Refine] Tất cả model AI đều bận ({last_err}). Chuyển sang parser cục bộ.")
        fallback_data = format_script_to_complete_json(raw_text)
        fallback_data["_used_fallback"] = True
        fallback_data["_fallback_notice"] = (
            "Máy chủ Google Gemini tạm thời quá tải (503 UNAVAILABLE). "
            "Hệ thống đã tự động chuyển sang bộ tách kịch bản thông minh cục bộ, kịch bản đã sẵn sàng!"
        )
        return fallback_data

    response_text = response.text.strip()
    cleaned = clean_json_string(response_text)
    data = json.loads(cleaned)
    normalized = normalize_script_data(data)
    return normalized
