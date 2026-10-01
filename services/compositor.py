"""
Compositor — FFmpeg video/audio processing
Ghép audio + video, nối scenes, thêm transitions, subtitles
"""

import subprocess
import uuid
from pathlib import Path
from typing import Optional

from config import config
from core.timeline import get_audio_duration


class Compositor:
    """FFmpeg-based video compositor"""

    def __init__(self):
        self.ffmpeg = config.FFMPEG_PATH
        self.output_dir = config.TEMP_DIR / "composed"
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def _run_ffmpeg(self, args: list[str], description: str = "") -> bool:
        """Chạy FFmpeg command"""
        cmd = [self.ffmpeg] + args
        print(f"[FFMPEG] {description}: {' '.join(cmd)}")

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=300,  # 5 minutes max
            )
            if result.returncode != 0:
                print(f"[FFMPEG ERROR] {result.stderr}")
                return False
            return True
        except subprocess.TimeoutExpired:
            print(f"[FFMPEG TIMEOUT] {description}")
            return False
        except FileNotFoundError:
            print(f"[FFMPEG] FFmpeg not found! Install: winget install ffmpeg")
            return False

    def _has_audio_stream(self, video_path: str) -> bool:
        try:
            result = subprocess.run(
                [self.ffmpeg, "-i", video_path], capture_output=True,
                text=True, encoding="utf-8", errors="replace", timeout=30,
            )
            return "Audio:" in result.stderr
        except (OSError, subprocess.TimeoutExpired):
            return False

    def swap_audio(self, video_path: str, audio_path: str, output_path: str = "") -> str:
        """
        Thay audio track của video bằng audio mới.
        Giữ nguyên video track, thay audio từ OmniVoice/Edge TTS.
        """
        if not output_path:
            output_path = str(self.output_dir / f"swapped_{uuid.uuid4().hex[:8]}.mp4")
        video_duration = get_audio_duration(video_path)

        success = self._run_ffmpeg([
            "-i", video_path,
            "-i", audio_path,
            "-c:v", "copy",
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-af", "apad",
            "-t", f"{video_duration:.3f}",
            "-y",
            output_path,
        ], "Swap audio")

        return output_path if success else ""

    def fit_video_duration(self, video_path: str, duration: float) -> str:
        """Loop or trim a generated clip to the audio timeline duration."""
        if not video_path or duration <= 0:
            return ""
        output_path = str(self.output_dir / f"fitted_{uuid.uuid4().hex[:8]}.mp4")
        success = self._run_ffmpeg([
            "-stream_loop", "-1", "-i", video_path,
            "-t", f"{duration:.3f}",
            "-c:v", "libx264", "-preset", "fast", "-crf", "22",
            "-c:a", "aac", "-pix_fmt", "yuv420p",
            "-y", output_path,
        ], "Fit video duration")
        return output_path if success else ""

    def merge_audio_files(self, audio_files: list[dict], output_path: str = "") -> str:
        """
        Ghép nhiều file audio theo timeline.
        audio_files: [{"file_path": str, "start_time": float}]
        """
        if not audio_files:
            return ""

        if not output_path:
            output_path = str(self.output_dir / f"merged_audio_{uuid.uuid4().hex[:8]}.mp3")

        if len(audio_files) == 1:
            # Chỉ có 1 file, copy trực tiếp
            success = self._run_ffmpeg([
                "-i", audio_files[0]["file_path"],
                "-y",
                output_path,
            ], "Copy single audio")
            return output_path if success else ""

        # Tạo filter complex cho nhiều audio files
        inputs = []
        filter_parts = []

        for i, audio in enumerate(audio_files):
            inputs.extend(["-i", audio["file_path"]])
            delay_ms = int(audio.get("start_time", 0) * 1000)
            filter_parts.append(f"[{i}:a]adelay={delay_ms}|{delay_ms}[a{i}]")

        # Mix all audio streams
        mix_inputs = "".join(f"[a{i}]" for i in range(len(audio_files)))
        filter_parts.append(f"{mix_inputs}amix=inputs={len(audio_files)}:duration=longest[aout]")

        filter_complex = ";".join(filter_parts)

        args = inputs + [
            "-filter_complex", filter_complex,
            "-map", "[aout]",
            "-y",
            output_path,
        ]

        success = self._run_ffmpeg(args, "Merge audio files")
        return output_path if success else ""

    def stitch_videos(self, video_paths: list[str], output_path: str = "",
                      transition: str = "fade") -> str:
        """
        Nối nhiều video lại thành 1, có transition.
        """
        if not video_paths:
            return ""

        if not output_path:
            output_path = str(self.output_dir / f"stitched_{uuid.uuid4().hex[:8]}.mp4")

        if len(video_paths) == 1:
            self._run_ffmpeg([
                "-i", video_paths[0],
                "-c", "copy",
                "-y",
                output_path,
            ], "Copy single video")
            return output_path

        # Tạo concat file
        concat_file = self.output_dir / f"concat_{uuid.uuid4().hex[:8]}.txt"
        with open(concat_file, "w", encoding="utf-8") as f:
            for vp in video_paths:
                f.write(f"file '{vp}'\n")

        if transition == "none":
            # Simple concat
            success = self._run_ffmpeg([
                "-f", "concat",
                "-safe", "0",
                "-i", str(concat_file),
                "-c", "copy",
                "-y",
                output_path,
            ], "Concat videos")
        else:
            # Re-encode for consistent format then concat
            normalized = []
            for i, vp in enumerate(video_paths):
                norm_path = str(self.output_dir / f"norm_{i}_{uuid.uuid4().hex[:8]}.mp4")
                self._run_ffmpeg([
                    "-i", vp,
                    "-c:v", "libx264",
                    "-preset", "fast",
                    "-crf", "23",
                    "-c:a", "aac",
                    "-ar", "44100",
                    "-ac", "2",
                    "-r", "24",
                    "-s", "1280x720",
                    "-y",
                    norm_path,
                ], f"Normalize video {i}")
                normalized.append(norm_path)

            # Update concat file
            with open(concat_file, "w", encoding="utf-8") as f:
                for vp in normalized:
                    f.write(f"file '{vp}'\n")

            success = self._run_ffmpeg([
                "-f", "concat",
                "-safe", "0",
                "-i", str(concat_file),
                "-c", "copy",
                "-y",
                output_path,
            ], "Concat normalized videos")

        # Cleanup concat file
        concat_file.unlink(missing_ok=True)

        return output_path if Path(output_path).exists() else ""

    def add_subtitles(self, video_path: str, srt_path: str, output_path: str = "") -> str:
        """Burn subtitles vào video"""
        if not output_path:
            output_path = str(self.output_dir / f"subtitled_{uuid.uuid4().hex[:8]}.mp4")

        # Escape path cho Windows (chỉ escape colon sau ký tự ổ đĩa)
        srt_escaped = str(srt_path).replace("\\", "/")
        # Chỉ escape colon ở vị trí đặc biệt, giữ nguyên ký tự ổ đĩa (ví dụ: C:)
        if len(srt_escaped) > 1 and srt_escaped[1] == ':':
            srt_escaped = srt_escaped[0] + "\\:" + srt_escaped[2:].replace(":", "\\:")
        else:
            srt_escaped = srt_escaped.replace(":", "\\:")

        success = self._run_ffmpeg([
            "-i", video_path,
            "-vf", f"subtitles='{srt_escaped}':force_style='FontSize=20,PrimaryColour=&Hffffff&'",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "23",
            "-c:a", "copy",
            "-y",
            output_path,
        ], "Add subtitles")

        return output_path if success else video_path  # Return original if failed

    def generate_srt(self, dialogues: list[dict], output_path: str) -> str:
        """
        Tạo file SRT từ danh sách dialogue.
        dialogues: [{"text": str, "start_time": float, "end_time": float, "character_name": str}]
        """
        with open(output_path, "w", encoding="utf-8") as f:
            for i, d in enumerate(dialogues, 1):
                start = self._seconds_to_srt_time(d["start_time"])
                end = self._seconds_to_srt_time(d["end_time"])
                name = d.get("character_name", "")
                text = d["text"]

                if name:
                    f.write(f"{i}\n{start} --> {end}\n[{name}] {text}\n\n")
                else:
                    f.write(f"{i}\n{start} --> {end}\n{text}\n\n")

        return output_path

    def _seconds_to_srt_time(self, seconds: float) -> str:
        """Convert seconds to SRT time format (HH:MM:SS,mmm)"""
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        secs = int(seconds % 60)
        millis = int((seconds % 1) * 1000)
        return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

    def export_final(
        self,
        video_path: str,
        project_id: str,
        title: str = "output",
    ) -> str:
        """Export video cuối cùng vào thư mục project"""
        project_dir = config.OUTPUT_DIR / project_id
        project_dir.mkdir(parents=True, exist_ok=True)

        safe_title = "".join(c for c in title if c.isalnum() or c in " _-").strip()
        safe_title = safe_title or "output"
        output_path = str(project_dir / f"{safe_title}.mp4")

        success = self._run_ffmpeg([
            "-i", video_path,
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", "20",
            "-c:a", "aac",
            "-b:a", "192k",
            "-movflags", "+faststart",
            "-y",
            output_path,
        ], "Export final video")

        return output_path if success else ""

    def build_timeline_video(
        self,
        scene_videos: list[str],
        output_path: str = "",
        master_audio_path: str = "",
    ) -> str:
        """
        Ghép timeline hoàn chỉnh cho video (đặc biệt hỗ trợ video dài 20-30 phút).
        - Chuẩn hóa các video clips (Veo clips + Ken Burns clips) đồng bộ về format:
          1280x720, 24fps, H.264, AAC.
        - Concat lại với video stream ổn định.
        - Nếu có master_audio_path (toàn bộ audio câu chuyện), thay thế audio track hoàn hảo.
        """
        if not scene_videos:
            return ""

        if not output_path:
            output_path = str(self.output_dir / f"timeline_{uuid.uuid4().hex[:8]}.mp4")

        # 1. Normalize clips
        normalized = []
        for i, vp in enumerate(scene_videos):
            if not vp or not Path(vp).exists():
                continue
            norm_path = str(self.output_dir / f"tl_norm_{i}_{uuid.uuid4().hex[:8]}.mp4")
            args = [
                "-i", vp,
            ]
            has_audio = self._has_audio_stream(vp)
            clip_duration = get_audio_duration(vp)
            if not has_audio:
                args.extend(["-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100"])
            args.extend([
                "-map", "0:v:0", "-map", "0:a:0" if has_audio else "1:a:0",
                "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1",
                "-c:v", "libx264",
                "-preset", "fast",
                "-crf", "22",
                "-r", "24",
                "-pix_fmt", "yuv420p",
                "-c:a", "aac",
                "-ar", "44100",
                "-ac", "2",
            ])
            if has_audio:
                args.extend(["-af", "apad"])
            args.extend(["-t", f"{clip_duration:.3f}"])
            args.extend(["-y", norm_path])
            if self._run_ffmpeg(args, f"Normalize timeline clip {i}"):
                normalized.append(norm_path)
            else:
                return ""

        if not normalized:
            return ""

        # 2. Concat via concat demuxer
        concat_file = self.output_dir / f"tl_concat_{uuid.uuid4().hex[:8]}.txt"
        with open(concat_file, "w", encoding="utf-8") as f:
            for p in normalized:
                f.write(f"file '{p.replace('\\', '/')}'\n")

        temp_concat_output = str(self.output_dir / f"concat_raw_{uuid.uuid4().hex[:8]}.mp4")
        concat_success = self._run_ffmpeg([
            "-f", "concat",
            "-safe", "0",
            "-i", str(concat_file),
            "-c:v", "copy",
            "-c:a", "copy",
            "-y",
            temp_concat_output,
        ], "Concat timeline clips")

        concat_file.unlink(missing_ok=True)

        if not concat_success or not Path(temp_concat_output).exists():
            return ""

        # 3. If master audio path provided, mux it in
        if master_audio_path and Path(master_audio_path).exists():
            final_success = self._run_ffmpeg([
                "-i", temp_concat_output,
                "-i", master_audio_path,
                "-c:v", "copy",
                "-c:a", "aac",
                "-b:a", "192k",
                "-map", "0:v:0",
                "-map", "1:a:0",
                "-shortest",
                "-y",
                output_path,
            ], "Mux master audio with video timeline")
            return output_path if final_success else temp_concat_output

        return temp_concat_output


# Singleton instance
compositor = Compositor()
