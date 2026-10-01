/**
 * ToolCreateVideo — Frontend Logic
 */

// ═══════════════════════════════════════════
//  State
// ═══════════════════════════════════════════
let currentProjectId = null;
let currentScript = null;
let ws = null;

// ═══════════════════════════════════════════
//  Tab Navigation
// ═══════════════════════════════════════════
function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ═══════════════════════════════════════════
//  Toast Notifications
// ═══════════════════════════════════════════
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ═══════════════════════════════════════════
//  Config Tab
// ═══════════════════════════════════════════
async function checkStatus() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();

        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        const statusGrid = document.getElementById('serviceStatusGrid');

        const voiceLabels = {
            gemini_tts: `Gemini TTS (${data.gemini_tts_voice || 'Gacrux'})`,
            omnivoice: 'OmniVoice',
            edge_tts: 'Edge TTS (Miễn phí)'
        };
        const voiceLabel = voiceLabels[data.voice_method] || data.voice_method;

        if (data.google_api) {
            dot.classList.add('connected');
            text.textContent = `Đã cấu hình Google API (ảnh: ${data.image_model}, video: ${data.video_model})`;
        } else {
            dot.classList.remove('connected');
            text.textContent = 'Chưa có Google API Key';
        }

        if (data.omnivoice_url && document.getElementById('omnivoiceUrl')) {
            if (!document.getElementById('omnivoiceUrl').value) {
                document.getElementById('omnivoiceUrl').value = data.omnivoice_url;
            }
        }
        if (document.getElementById('omnivoiceNumStep')) {
            document.getElementById('omnivoiceNumStep').value = data.omnivoice_num_step || 32;
        }
        if (document.getElementById('omnivoiceSpeed')) {
            document.getElementById('omnivoiceSpeed').value = data.omnivoice_speed || 1.0;
        }
        if (document.getElementById('voiceProvider')) {
            document.getElementById('voiceProvider').value = data.voice_provider || 'gemini';
        }
        if (document.getElementById('geminiTtsModel')) {
            document.getElementById('geminiTtsModel').value = data.gemini_tts_model || 'gemini-3.8-flash-tts';
        }
        if (document.getElementById('geminiTtsVoice')) {
            document.getElementById('geminiTtsVoice').value = data.gemini_tts_voice || 'Gacrux';
        }
        if (document.getElementById('geminiTtsStyle')) {
            document.getElementById('geminiTtsStyle').value = data.gemini_tts_style || '';
        }

        if (statusGrid) {
            statusGrid.innerHTML = `
                <div style="font-size:12px;padding:6px 12px;border-radius:6px;background:${data.google_api ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};color:${data.google_api ? '#34d399' : '#f87171'};border:1px solid ${data.google_api ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}">
                    ${data.google_api ? `✅ Google API (${escapeHtml(data.image_model)} & ${escapeHtml(data.video_model)})` : '⚠️ Google API Key chưa có'}
                </div>
                <div style="font-size:12px;padding:6px 12px;border-radius:6px;background:${data.omnivoice_api ? 'rgba(168,85,247,0.15)' : 'rgba(56,189,248,0.1)'};color:${data.omnivoice_api ? '#c084fc' : '#38bdf8'};border:1px solid ${data.omnivoice_api ? 'rgba(168,85,247,0.3)' : 'rgba(56,189,248,0.3)'}">
                    🎙️ Voice: <strong>${voiceLabel}</strong>
                </div>
                <div style="font-size:12px;padding:6px 12px;border-radius:6px;background:${data.ffmpeg_ready ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};color:${data.ffmpeg_ready ? '#34d399' : '#f87171'};border:1px solid rgba(16,185,129,0.3)}">
                    ${data.ffmpeg_ready ? '⚡ FFmpeg đã sẵn sàng' : '⚠️ FFmpeg chưa tìm thấy'}
                </div>
            `;
        }
    } catch (e) {
        showToast('Không thể kết nối server', 'error');
    }
}

async function testGoogleConnection() {
    try {
        const res = await fetch('/api/google/test');
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
        showToast(`Kết nối Google thành công: ${data.image_model}, ${data.video_model}`, 'success');
    } catch (error) {
        showToast(`Kết nối Google thất bại: ${error.message}`, 'error');
    }
}

async function testOmniVoiceConnection() {
    showToast('Đang kiểm tra OmniVoice...', 'info');
    try {
        const res = await fetch('/api/voice/health');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.detail || data.status || `HTTP ${res.status}`);
        const device = data.device ? ` trên ${data.device}` : '';
        const promptReady = data.voice_prompt_ready === false ? ' nhưng giọng mẫu chưa sẵn sàng' : '';
        showToast(`OmniVoice đã sẵn sàng${device}${promptReady}`, data.voice_prompt_ready === false ? 'error' : 'success');
    } catch (error) {
        showToast(`OmniVoice chưa sẵn sàng: ${error.message}`, 'error');
    }
}

async function saveConfig() {
    const googleKey = document.getElementById('googleApiKey').value.trim();
    const wavespeedKey = document.getElementById('wavespeedApiKey').value.trim();
    const omnivoiceUrl = document.getElementById('omnivoiceUrl') ? document.getElementById('omnivoiceUrl').value.trim() : '';
    const omnivoiceApiKey = document.getElementById('omnivoiceApiKey') ? document.getElementById('omnivoiceApiKey').value.trim() : '';
    const omnivoiceNumStep = document.getElementById('omnivoiceNumStep')?.value || '32';
    const omnivoiceSpeed = document.getElementById('omnivoiceSpeed')?.value || '1.0';
    const voiceProvider = document.getElementById('voiceProvider')?.value || 'gemini';
    const geminiTtsModel = document.getElementById('geminiTtsModel')?.value || 'gemini-3.8-flash-tts';
    const geminiTtsVoice = document.getElementById('geminiTtsVoice')?.value || 'Gacrux';
    const geminiTtsStyle = document.getElementById('geminiTtsStyle')?.value.trim() || 'warm, clear Vietnamese narration';

    try {
        const formData = new FormData();
        formData.append('google_api_key', googleKey);
        formData.append('wavespeed_api_key', wavespeedKey);
        formData.append('omnivoice_url', omnivoiceUrl);
        formData.append('omnivoice_api_key', omnivoiceApiKey);
        formData.append('omnivoice_num_step', omnivoiceNumStep);
        formData.append('omnivoice_speed', omnivoiceSpeed);
        formData.append('voice_provider', voiceProvider);
        formData.append('gemini_tts_model', geminiTtsModel);
        formData.append('gemini_tts_voice', geminiTtsVoice);
        formData.append('gemini_tts_style', geminiTtsStyle);

        const res = await fetch('/api/config/save', { method: 'POST', body: formData });
        const text = await res.text();
        let data = {};
        try {
            data = JSON.parse(text);
        } catch (_) {
            throw new Error(text || `Server trả về mã lỗi ${res.status}`);
        }

        if (!res.ok || data.status === 'error') {
            throw new Error(data.message || 'Lỗi lưu cấu hình');
        }

        showToast(data.message, 'success');
        await checkStatus();
    } catch (e) {
        showToast('Lỗi lưu config: ' + e.message, 'error');
    }
}

async function testVoice() {
    const text = document.getElementById('testVoiceText').value;
    const gender = document.getElementById('testVoiceGender').value;

    showToast('Đang tạo giọng nói...', 'info');

    try {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('gender', gender);

        const res = await fetch('/api/voice/test', { method: 'POST', body: formData });

        if (res.ok) {
            const method = res.headers.get('X-Voice-Method') || 'unknown';
            const fallback = res.headers.get('X-Voice-Fallback') === 'true';
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const player = document.getElementById('testAudioPlayer');
            player.src = url;
            player.style.display = 'block';
            player.play();
            const labels = { gemini_tts: 'Gemini TTS', omnivoice: 'OmniVoice', edge_tts: 'Edge TTS' };
            const message = `Tạo giọng thành công bằng ${labels[method] || method}${fallback ? ' (đã dùng dự phòng)' : ''}`;
            showToast(message, fallback ? 'info' : 'success');
        } else {
            let message = `HTTP ${res.status}`;
            try {
                const data = await res.json();
                message = data.detail || message;
            } catch (_) {}
            showToast(`Lỗi tạo giọng nói: ${message}`, 'error');
        }
    } catch (e) {
        showToast('Lỗi: ' + e.message, 'error');
    }
}

// ═══════════════════════════════════════════
//  Script Tab & File Upload
// ═══════════════════════════════════════════
async function handleScriptFileUpload(input) {
    const file = input.files ? input.files[0] : null;
    if (!file) return;
    await uploadScriptFile(file);
    input.value = '';
}

async function uploadScriptFile(file) {
    const dropText = document.getElementById('scriptDropText');
    const dropArea = document.getElementById('scriptDropArea');
    const validationDiv = document.getElementById('scriptValidation');

    if (dropText) dropText.textContent = `⏳ Đang đọc file ${file.name}...`;
    showToast(`Đang tải file ${file.name}...`, 'info');

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/script/upload', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Không thể xử lý file kịch bản');
        }

        document.getElementById('scriptEditor').value = data.script_json;
        if (dropArea) {
            dropArea.classList.add('has-file');
        }
        if (dropText) {
            dropText.innerHTML = `✅ <strong>${escapeHtml(file.name)}</strong>: "${escapeHtml(data.title)}" (${data.scenes} cảnh, ${data.characters} nhân vật)`;
        }

        let previewHtml = '';
        if (data.scenes_preview && data.scenes_preview.length > 0) {
            previewHtml = `
                <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(16,185,129,0.3)">
                    <strong>🎬 Danh sách các đoạn đã tách từ file của bạn (${data.scenes} cảnh):</strong>
                    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
                        ${data.scenes_preview.map((s, idx) => {
                const isKey = s.scene_type === 'key';
                const badge = isKey
                    ? '<span class="scene-type-btn key" style="font-size:10px;padding:1px 8px;margin-left:6px">🎬 KEY (Veo 3.1)</span>'
                    : '<span class="scene-type-btn filler" style="font-size:10px;padding:1px 8px;margin-left:6px">🖼️ FILLER (Gemini tạo ảnh)</span>';
                return `
                            <div style="background:rgba(255,255,255,0.05);padding:8px 12px;border-radius:6px;font-size:12px;border-left:3px solid ${isKey ? '#ec4899' : '#38bdf8'}">
                                <div style="display:flex;align-items:center;justify-content:space-between">
                                    <strong>🎬 Cảnh ${idx + 1} (${escapeHtml(s.id)}):</strong>
                                    ${badge}
                                </div>
                                <div style="color:var(--text-secondary);margin-top:2px">${escapeHtml(s.setting)}</div>
                                <span style="color:var(--text-secondary)">💬 ${s.dialogues_count} câu thoại ${s.has_narration ? '• Có lời dẫn' : ''}: <em>"${escapeHtml(s.sample_text)}"</em></span>
                            </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }

        validationDiv.innerHTML = `
            <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:14px;border-radius:8px;border:1px solid rgba(16,185,129,0.3)">
                ✅ <strong>Đã tải và bóc tách thành công từ file: "${escapeHtml(file.name)}"!</strong><br>
                📌 Tiêu đề: <strong>${escapeHtml(data.title)}</strong><br>
                👥 ${data.characters} nhân vật | 🎬 Đã tách thành ${data.scenes} cảnh<br>
                ${previewHtml}
                <div style="margin-top:10px;font-size:12px;color:var(--accent-secondary)">
                    👉 Toàn bộ nội dung từ file của bạn đã được đưa vào ô kịch bản bên dưới. Bấm nút <strong>"Tạo Project"</strong> để chuyển sang bước tiếp theo!
                </div>
            </div>
        `;
        showToast(`Đã tải & tách ${data.scenes} cảnh từ file ${file.name}!`, 'success');
    } catch (e) {
        if (dropText) {
            dropText.textContent = 'Bấm vào đây để tải file kịch bản lên (hoặc kéo thả file vào ô này)';
        }
        validationDiv.innerHTML = `
            <div style="color:var(--error);background:rgba(239,68,68,0.1);padding:12px;border-radius:8px;border:1px solid rgba(239,68,68,0.3)">
                ❌ <strong>Lỗi đọc file kịch bản:</strong><br>${escapeHtml(e.message)}
            </div>
        `;
        showToast('Lỗi tải kịch bản: ' + e.message, 'error');
    }
}

async function loadSampleScript() {
    showToast('Đang tải kịch bản mẫu...', 'info');
    try {
        const res = await fetch('/api/script/sample');
        if (!res.ok) throw new Error(`Lỗi kết nối (${res.status})`);
        const data = await res.json();
        document.getElementById('scriptEditor').value = JSON.stringify(data, null, 2);
        showToast('Đã tải kịch bản mẫu', 'success');
        validateScript();
    } catch (e) {
        showToast('Lỗi tải kịch bản mẫu: ' + e.message, 'error');
    }
}

async function formatJson() {
    const editor = document.getElementById('scriptEditor');
    const text = editor.value;

    if (!text.trim()) {
        showToast('Vui lòng nhập hoặc dán nội dung kịch bản vào ô bên dưới trước!', 'error');
        return;
    }

    showToast('Đang tách đoạn và chuyển sang cấu trúc JSON...', 'info');

    try {
        const formData = new FormData();
        formData.append('script_text', text);

        const res = await fetch('/api/script/format', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Không thể format JSON');
        }

        editor.value = data.script_json;

        let previewHtml = '';
        if (data.scenes_preview && data.scenes_preview.length > 0) {
            previewHtml = `
                <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(16,185,129,0.3)">
                    <strong>🎬 Danh sách các đoạn đã tách thành công (${data.scenes} cảnh):</strong>
                    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;max-height:220px;overflow-y:auto">
                        ${data.scenes_preview.map((s, idx) => {
                const isKey = s.scene_type === 'key';
                const badge = isKey
                    ? '<span class="scene-type-btn key" style="font-size:10px;padding:1px 8px;margin-left:6px">🎬 KEY (Veo 3.1)</span>'
                    : '<span class="scene-type-btn filler" style="font-size:10px;padding:1px 8px;margin-left:6px">🖼️ FILLER (Gemini tạo ảnh)</span>';
                return `
                            <div style="background:rgba(255,255,255,0.05);padding:8px 12px;border-radius:6px;font-size:12px;border-left:3px solid ${isKey ? '#ec4899' : '#38bdf8'}">
                                <div style="display:flex;align-items:center;justify-content:space-between">
                                    <strong>🎬 Cảnh ${idx + 1} (${escapeHtml(s.id)}):</strong>
                                    ${badge}
                                </div>
                                <div style="color:var(--text-secondary);margin-top:2px">${escapeHtml(s.setting)}</div>
                                <span style="color:var(--text-secondary)">💬 ${s.dialogues_count} câu thoại ${s.has_narration ? '• Có lời dẫn' : ''}: <em>"${escapeHtml(s.sample_text)}"</em></span>
                            </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }

        const validationDiv = document.getElementById('scriptValidation');
        validationDiv.innerHTML = `
            <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:14px;border-radius:8px;border:1px solid rgba(16,185,129,0.3)">
                ✅ <strong>Đã tách thành công sang định dạng JSON từng đoạn!</strong><br>
                📌 Tiêu đề: <strong>${escapeHtml(data.title)}</strong><br>
                👥 ${data.characters} nhân vật | 🎬 Đã tách thành ${data.scenes} cảnh<br>
                ${previewHtml}
                <div style="margin-top:10px;font-size:12px;color:var(--accent-secondary)">
                    👉 Toàn bộ các cảnh đã được format vào ô JSON bên dưới. Bấm nút <strong>"Tạo Project"</strong> để tiếp tục!
                </div>
            </div>
        `;
        showToast(`Đã tách thành ${data.scenes} đoạn cảnh dạng JSON!`, 'success');
    } catch (e) {
        showToast('Lỗi format JSON: ' + e.message, 'error');
    }
}

async function loadFullTemplate() {
    showToast('Đang tải mẫu JSON đầy đủ...', 'info');
    try {
        const res = await fetch('/api/script/template');
        if (!res.ok) throw new Error('Không thể tải template');
        const data = await res.json();
        document.getElementById('scriptEditor').value = JSON.stringify(data, null, 2);
        showToast('Đã tải mẫu JSON chuẩn & đầy đủ', 'success');

        const validationDiv = document.getElementById('scriptValidation');
        validationDiv.innerHTML = `
            <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:12px;border-radius:8px;border:1px solid rgba(16,185,129,0.3)">
                📋 <strong>Đã tải Mẫu Kịch Bản Chuẩn & Đầy Đủ</strong><br>
                <span style="font-size:12px;color:var(--text-secondary)">Bạn có thể chỉnh sửa trực tiếp nội dung các cảnh, lời thoại hoặc nhân vật theo ý muốn.</span>
            </div>
        `;
    } catch (e) {
        showToast('Lỗi tải template: ' + e.message, 'error');
    }
}

async function refineScriptWithAI() {
    const text = document.getElementById('scriptEditor').value;
    const btn = document.getElementById('btnAiRefine');
    const validationDiv = document.getElementById('scriptValidation');

    if (!text.trim()) {
        showToast('Vui lòng dán kịch bản hoặc ý tưởng trước khi chuẩn hóa AI', 'error');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> AI đang phân tích kịch bản...';
    showToast('Gemini AI đang chuẩn hóa kịch bản...', 'info');

    try {
        const formData = new FormData();
        formData.append('script_text', text);

        const res = await fetch('/api/script/ai-refine', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Không thể chuẩn hóa bằng AI');
        }

        document.getElementById('scriptEditor').value = data.script_json;
        validationDiv.innerHTML = `
            <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:12px;border-radius:8px;border:1px solid rgba(16,185,129,0.3)">
                ✨ <strong>AI đã chuẩn hóa kịch bản điện ảnh thành công!</strong><br>
                📌 Tiêu đề: <strong>${escapeHtml(data.title)}</strong><br>
                👥 ${data.characters} nhân vật | 🎬 ${data.scenes} cảnh<br>
                <span style="font-size:12px;color:var(--text-secondary)">Các mô tả bối cảnh và góc máy đã được AI tối ưu hóa cho Veo 3.1. Bấm "Tạo Project" để tiếp tục.</span>
            </div>
        `;
        showToast(`AI đã chuẩn hóa: ${data.title}`, 'success');
    } catch (e) {
        showToast('Lỗi AI: ' + e.message, 'error');
        validationDiv.innerHTML = `
            <div style="color:var(--error);background:rgba(239,68,68,0.1);padding:12px;border-radius:8px;border:1px solid rgba(239,68,68,0.3)">
                ❌ <strong>Lỗi AI chuẩn hóa:</strong> ${escapeHtml(e.message)}
            </div>
        `;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '🤖 AI Chuẩn hóa kịch bản (Gemini)';
    }
}

async function validateScript() {
    const scriptJson = document.getElementById('scriptEditor').value;
    const validationDiv = document.getElementById('scriptValidation');

    if (!scriptJson.trim()) {
        showToast('Vui lòng nhập kịch bản hoặc tải file lên', 'error');
        return;
    }

    validationDiv.innerHTML = '<span style="color:var(--text-secondary)">⏳ Đang kiểm tra kịch bản...</span>';

    try {
        const formData = new FormData();
        formData.append('script_json', scriptJson);

        const res = await fetch('/api/script/validate', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.valid) {
            if (data.script_json) {
                document.getElementById('scriptEditor').value = data.script_json;
            }
            validationDiv.innerHTML = `
                <div style="color:var(--success);background:rgba(16,185,129,0.1);padding:12px;border-radius:8px;border:1px solid rgba(16,185,129,0.3)">
                    ✅ <strong>Kịch bản hợp lệ!</strong><br>
                    📌 Tiêu đề: <strong>${escapeHtml(data.title)}</strong><br>
                    👥 ${data.characters} nhân vật: ${data.character_names ? data.character_names.map(escapeHtml).join(', ') : ''}<br>
                    🎬 ${data.scenes} cảnh | 💬 ${data.total_dialogues} lời thoại
                </div>
            `;
            showToast('Kịch bản hợp lệ!', 'success');
        } else {
            validationDiv.innerHTML = `
                <div style="color:var(--error);background:rgba(239,68,68,0.1);padding:12px;border-radius:8px;border:1px solid rgba(239,68,68,0.3)">
                    ❌ <strong>Kịch bản chưa đúng format:</strong><br>${escapeHtml(data.error)}
                </div>
            `;
            showToast('Kịch bản chưa đúng định dạng', 'error');
        }
    } catch (e) {
        validationDiv.innerHTML = `<div style="color:var(--error)">❌ Lỗi kết nối: ${escapeHtml(e.message)}</div>`;
        showToast('Lỗi kiểm tra: ' + e.message, 'error');
    }
}

async function createProject() {
    const scriptJson = document.getElementById('scriptEditor').value;

    if (!scriptJson.trim()) {
        showToast('Vui lòng nhập kịch bản hoặc tải file lên', 'error');
        return;
    }

    const btn = document.getElementById('btnCreateProject');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Đang tạo project...';
    }

    try {
        const formData = new FormData();
        formData.append('script_json', scriptJson);

        const res = await fetch('/api/project/create', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Không thể tạo project');
        }

        currentProjectId = data.project_id;
        currentScript = data.script;

        showToast(`Project "${data.title}" đã tạo thành công!`, 'success');

        // Update characters tab
        renderCharacters();

        // Update generate tab
        document.getElementById('generateInfo').style.display = 'none';
        document.getElementById('generateControls').style.display = 'block';
        updateProjectStats();
        renderGenerateSceneCards();

        // Switch to characters tab
        switchTab('characters');

    } catch (e) {
        showToast('Lỗi tạo project: ' + e.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🚀 Tạo Project';
        }
    }
}

function updateProjectStats() {
    if (!currentScript || !currentScript.scenes) return;
    const total = currentScript.scenes.length;
    const keyCount = currentScript.scenes.filter(s => s.scene_type === 'key').length;
    const fillerCount = total - keyCount;

    const elTitle = document.getElementById('projectTitle');
    const elScenes = document.getElementById('projectScenes');
    const elKey = document.getElementById('projectKeyScenes');
    const elFiller = document.getElementById('projectFillerScenes');
    const elChars = document.getElementById('projectChars');

    if (elTitle) elTitle.textContent = currentScript.title || '—';
    if (elScenes) elScenes.textContent = total;
    if (elKey) elKey.textContent = keyCount;
    if (elFiller) elFiller.textContent = fillerCount;
    if (elChars) elChars.textContent = currentScript.characters ? currentScript.characters.length : 0;
    renderVisualBibleSummary();
}

function renderVisualBibleSummary() {
    const container = document.getElementById('visualBibleSummary');
    if (!container || !currentScript?.visual_bible) return;
    const bible = currentScript.visual_bible;
    container.innerHTML = `
        <strong>🎨 Visual Bible:</strong>
        <span>${escapeHtml(bible.style || '')}</span>
        <span>• ${escapeHtml(bible.color_palette || '')}</span>
        <span>• ${escapeHtml(bible.lighting_language || '')}</span>
    `;
}

async function analyzeVisualPlan() {
    if (!currentProjectId) return showToast('Hãy tạo project trước', 'error');
    const button = document.getElementById('btnVisualAnalyze');
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> AI đang thiết kế...';
    showToast('Gemini đang tạo Character Bible, Visual Bible và continuity...', 'info');
    try {
        const response = await fetch(`/api/project/${encodeURIComponent(currentProjectId)}/visual-analyze`, { method: 'POST' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không thể phân tích bố cục');
        currentScript = data.script;
        renderCharacters();
        updateProjectStats();
        renderGenerateSceneCards();
        if (data.warning) showToast(data.warning, 'error');
        else showToast('Đã khóa nhận dạng nhân vật và bố cục toàn bộ cảnh.', 'success');
    } catch (error) {
        showToast('Lỗi phân tích hình ảnh: ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = '🧠 AI phân tích bố cục & đồng bộ';
    }
}

async function toggleSceneType(sceneId) {
    if (!currentProjectId) {
        showToast('Chưa có project để đổi loại cảnh', 'error');
        return;
    }

    try {
        const res = await fetch(`/api/project/${currentProjectId}/scene/${sceneId}/toggle-type`, { method: 'POST' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Không thể đổi loại cảnh');
        if (data.status === 'ok') {
            const sc = currentScript.scenes.find(s => s.id === sceneId);
            if (sc) {
                sc.scene_type = data.scene_type;
            }
            updateProjectStats();

            const btn = document.getElementById(`btn-type-${sceneId}`);
            if (btn) {
                btn.className = `scene-type-btn ${data.scene_type}`;
                btn.innerHTML = data.scene_type === 'key' ? '🎬 KEY (Veo 3.1)' : '🖼️ FILLER (Gemini tạo ảnh)';
            }
            showToast(`Cảnh ${sceneId} chuyển thành ${data.scene_type.toUpperCase()}`, 'info');
        }
    } catch (e) {
        showToast('Lỗi đổi loại cảnh: ' + e.message, 'error');
    }
}

function renderGenerateSceneCards() {
    const container = document.getElementById('sceneProgress');
    document.getElementById('progressContainer').style.display = 'block';

    if (currentScript && currentScript.scenes) {
        container.innerHTML = currentScript.scenes.map((scene, i) => {
            const isKey = scene.scene_type === 'key';
            const typeLabel = isKey ? '🎬 KEY (Veo 3.1)' : '🖼️ FILLER (Gemini tạo ảnh)';
            const typeClass = isKey ? 'key' : 'filler';

            return `
            <div class="scene-card" id="scene-card-${escapeAttr(scene.id)}">
                <div class="scene-header">
                    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                        <span class="scene-title">🎬 Cảnh ${i + 1}: ${escapeHtml(scene.setting.substring(0, 48))}...</span>
                        <button type="button" class="scene-type-btn ${typeClass}" id="btn-type-${escapeAttr(scene.id)}" data-scene-id="${escapeAttr(scene.id)}" title="Nhấp để đổi KEY (Veo 3.1) và FILLER (Gemini tạo ảnh)">
                            ${typeLabel}
                        </button>
                        <button type="button" class="scene-flow-retry-btn" id="btn-flow-${escapeAttr(scene.id)}" data-flow-scene-id="${escapeAttr(scene.id)}" title="Chỉ tạo lại cảnh này bằng Google Flow">
                            ↻ Tạo lại Flow
                        </button>
                        <button type="button" class="scene-prompt-btn" data-prompt-scene-id="${escapeAttr(scene.id)}">📝 Prompt</button>
                    </div>
                    <span class="scene-badge pending" id="badge-${escapeAttr(scene.id)}">Đang chờ</span>
                </div>
                <div class="scene-prompt-panel" id="prompt-panel-${escapeAttr(scene.id)}" style="display:none">
                    <div class="scene-plan-line"><b>Bố cục:</b> ${escapeHtml(scene.composition || 'Chưa phân tích')}</div>
                    <div class="scene-plan-line"><b>Ánh sáng:</b> ${escapeHtml(scene.lighting || 'Chưa phân tích')}</div>
                    <div class="scene-plan-line"><b>Continuity:</b> ${escapeHtml((scene.continuity || []).join('; ') || 'Chưa có')}</div>
                    <textarea class="scene-prompt-editor" id="prompt-editor-${escapeAttr(scene.id)}" placeholder="Đang tải prompt..."></textarea>
                    <div class="scene-prompt-actions">
                        <button type="button" class="btn btn-secondary btn-sm" data-save-prompt-id="${escapeAttr(scene.id)}">💾 Lưu prompt</button>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-${escapeAttr(scene.id)}" style="width:0%"></div>
                    </div>
                    <div class="progress-label">
                        <span id="msg-${escapeAttr(scene.id)}">Sẵn sàng</span>
                        <span id="pct-${escapeAttr(scene.id)}">0%</span>
                    </div>
                </div>
            </div>
            `;
        }).join('') + `
            <div class="scene-card" id="scene-card-final">
                <div class="scene-header">
                    <span class="scene-title">📦 Ghép timeline video hoàn chỉnh</span>
                    <span class="scene-badge pending" id="badge-final">Đang chờ</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-final" style="width:0%"></div>
                    </div>
                    <div class="progress-label">
                        <span id="msg-final">Đang chờ...</span>
                        <span id="pct-final">0%</span>
                    </div>
                </div>
            </div>
        `;
        container.querySelectorAll('.scene-type-btn[data-scene-id]').forEach(button => {
            button.addEventListener('click', () => toggleSceneType(button.dataset.sceneId));
        });
        container.querySelectorAll('.scene-flow-retry-btn[data-flow-scene-id]').forEach(button => {
            button.addEventListener('click', () => retrySceneInFlow(button.dataset.flowSceneId));
        });
        container.querySelectorAll('.scene-prompt-btn[data-prompt-scene-id]').forEach(button => {
            button.addEventListener('click', () => toggleScenePrompt(button.dataset.promptSceneId));
        });
        container.querySelectorAll('[data-save-prompt-id]').forEach(button => {
            button.addEventListener('click', () => saveScenePrompt(button.dataset.savePromptId));
        });
    }
}

async function toggleScenePrompt(sceneId) {
    const panel = document.getElementById(`prompt-panel-${sceneId}`);
    const editor = document.getElementById(`prompt-editor-${sceneId}`);
    if (!panel || !editor) return;
    const opening = panel.style.display === 'none';
    panel.style.display = opening ? 'block' : 'none';
    if (!opening || editor.dataset.loaded === 'true') return;
    try {
        const response = await fetch(`/api/project/${encodeURIComponent(currentProjectId)}/scene/${encodeURIComponent(sceneId)}/prompt`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không tải được prompt');
        editor.value = data.prompt;
        editor.dataset.loaded = 'true';
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function saveScenePrompt(sceneId) {
    const editor = document.getElementById(`prompt-editor-${sceneId}`);
    if (!editor) return;
    const form = new FormData();
    form.append('prompt', editor.value);
    try {
        const response = await fetch(
            `/api/project/${encodeURIComponent(currentProjectId)}/scene/${encodeURIComponent(sceneId)}/prompt`,
            { method: 'POST', body: form },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không lưu được prompt');
        const scene = currentScript?.scenes?.find(item => item.id === sceneId);
        if (scene) scene.prompt_override = editor.value.trim();
        showToast(`Đã lưu prompt riêng cho ${sceneId}.`, 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function openFlowWindows() {
    try {
        const response = await fetch('/api/flow/browser/start', { method: 'POST' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không thể mở Chrome Flow');
        showToast(data.message, 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function generateInFlow() {
    if (!currentProjectId) {
        showToast('Hãy tạo project trước', 'error');
        return;
    }
    try {
        showToast('Đang mở Flow và gửi prompt...', 'info');
        const response = await fetch(`/api/project/${encodeURIComponent(currentProjectId)}/flow-generate`, { method: 'POST' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không thể gửi prompt vào Flow');
        const results = data.results || [];
        const completed = results.filter(item => item.status === 'done' && item.file_path);
        const pending = results.filter(item => item.status === 'submitted');
        const failed = results.filter(item => item.status === 'error');

        completed.forEach(item => {
            const scene = currentScript?.scenes?.find(entry => entry.id === item.scene_id);
            if (scene) {
                if (item.media_type === 'video') scene.flow_video_path = item.file_path;
                else scene.flow_image_path = item.file_path;
            }
            updateProgress({
                scene_id: item.scene_id,
                status: 'done',
                progress: 100,
                message: item.media_type === 'video' ? 'Đã nhận video từ Flow' : 'Đã nhận ảnh từ Flow',
            });
        });
        pending.forEach(item => updateProgress({
            scene_id: item.scene_id,
            status: 'error',
            progress: 0,
            message: 'Flow đã nhận prompt nhưng tool chưa tải được ảnh. Bấm Tạo lại Flow.',
        }));
        failed.forEach(item => updateProgress({
            scene_id: item.scene_id,
            status: 'error',
            progress: 0,
            message: item.error || 'Không tạo được trên Flow. Bấm Tạo lại Flow.',
        }));
        if (failed.length) {
            const firstError = failed[0].error || 'Không xác định được nguyên nhân';
            showToast(`${failed.length} cảnh không gửi được. Lỗi đầu tiên: ${firstError}`, 'error');
        } else if (pending.length) {
            showToast(`Đã nhận ${completed.length}/${results.length} ảnh. ${pending.length} cảnh chưa tải được từ Flow.`, 'error');
        } else {
            showToast(`Đã nhận ${completed.length} ảnh từ Flow bằng ${data.concurrency} luồng.`, 'success');
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function retrySceneInFlow(sceneId) {
    if (!currentProjectId) {
        showToast('Hãy tạo project trước', 'error');
        return;
    }
    const button = document.getElementById(`btn-flow-${sceneId}`);
    const originalLabel = button?.innerHTML || '↻ Tạo lại Flow';
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Đang tạo...';
    }
    updateProgress({
        scene_id: sceneId,
        status: 'processing',
        progress: 10,
        message: 'Đang tạo lại riêng cảnh này trên Flow...',
    });

    try {
        const response = await fetch(
            `/api/project/${encodeURIComponent(currentProjectId)}/scene/${encodeURIComponent(sceneId)}/flow-generate`,
            { method: 'POST' },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Không thể tạo lại cảnh trên Flow');

        const scene = currentScript?.scenes?.find(item => item.id === sceneId);
        if (scene) {
            if (data.media_type === 'video') {
                scene.flow_video_path = data.file_path;
                scene.flow_image_path = '';
            } else {
                scene.flow_image_path = data.file_path;
                scene.flow_video_path = '';
            }
        }
        updateProgress({
            scene_id: sceneId,
            status: 'done',
            progress: 100,
            message: data.media_type === 'video' ? 'Đã nhận video mới từ Flow' : 'Đã nhận ảnh mới từ Flow',
        });
        showToast(`Đã tạo lại ${sceneId} thành công.`, 'success');
    } catch (error) {
        updateProgress({
            scene_id: sceneId,
            status: 'error',
            progress: 0,
            message: error.message,
        });
        showToast(`Tạo lại ${sceneId} thất bại: ${error.message}`, 'error');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = originalLabel;
        }
    }
}

// ═══════════════════════════════════════════
//  Characters Tab
// ═══════════════════════════════════════════
function renderCharacters() {
    const grid = document.getElementById('characterGrid');

    if (!currentScript || !currentScript.characters) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">👤</div><p>Chưa có nhân vật</p></div>';
        return;
    }

    grid.innerHTML = currentScript.characters.map(char => `
        <div class="character-card">
            <div class="character-avatar">${char.voice_gender === 'male' ? '👨' : '👩'}</div>
            <div class="character-name">${escapeHtml(char.name)}</div>
            <div class="character-desc">${escapeHtml(char.description || 'Không có mô tả')}</div>
            <div class="character-bible">
                <div><b>Identity lock:</b> ${escapeHtml(char.appearance_signature || char.description || 'Chưa phân tích')}</div>
                <div><b>Trang phục:</b> ${escapeHtml(char.wardrobe || 'Chưa phân tích')}</div>
                <div><b>Đặc điểm khóa:</b> ${escapeHtml((char.identity_markers || []).join('; ') || 'Chưa có')}</div>
            </div>

            <div class="upload-area" id="img-${escapeAttr(char.id)}" data-upload-id="${escapeAttr(char.id)}" data-upload-type="image">
                📷 Upload ảnh reference (${(char.reference_images || []).length} ảnh)
            </div>
            <input type="file" id="file-img-${escapeAttr(char.id)}" accept="image/*" style="display:none"
                   data-file-id="${escapeAttr(char.id)}" data-file-type="image">

            <div class="upload-area" id="voice-${escapeAttr(char.id)}" data-upload-id="${escapeAttr(char.id)}" data-upload-type="voice"
                 style="margin-top:8px">
                🎙️ Upload giọng mẫu 3-10s (tùy chọn)
            </div>
            <input type="file" id="file-voice-${escapeAttr(char.id)}" accept="audio/*" style="display:none"
                   data-file-id="${escapeAttr(char.id)}" data-file-type="voice">
        </div>
    `).join('');
    grid.querySelectorAll('[data-upload-id]').forEach(area => {
        area.addEventListener('click', () => uploadAsset(area.dataset.uploadId, area.dataset.uploadType));
    });
    grid.querySelectorAll('[data-file-id]').forEach(input => {
        input.addEventListener('change', () => handleFileUpload(input.dataset.fileId, input.dataset.fileType, input));
    });
}

function uploadAsset(charId, type) {
    document.getElementById(`file-${type === 'image' ? 'img' : 'voice'}-${charId}`).click();
}

async function handleFileUpload(charId, type, input) {
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('character_id', charId);
    formData.append('asset_type', type);
    formData.append('file', file);

    try {
        const res = await fetch(`/api/project/${currentProjectId}/upload-asset`, {
            method: 'POST', body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Không thể upload tệp');
        if (data.status === 'ok') {
            const character = currentScript?.characters?.find(item => item.id === charId);
            if (character && type === 'image') {
                character.reference_images = character.reference_images || [];
                if (!character.reference_images.includes(data.file_path)) character.reference_images.push(data.file_path);
            } else if (character && type === 'voice') {
                character.voice_ref = data.file_path;
            }
            const areaId = type === 'image' ? `img-${charId}` : `voice-${charId}`;
            const area = document.getElementById(areaId);
            area.classList.add('has-file');
            area.textContent = `✅ ${file.name}`;
            showToast(`Upload ${type} cho ${charId} thành công!`, 'success');
        }
    } catch (e) {
        showToast('Lỗi upload: ' + e.message, 'error');
    }
}

// ═══════════════════════════════════════════
//  Generate Tab
// ═══════════════════════════════════════════
async function startGeneration() {
    if (!currentProjectId) {
        showToast('Chưa có project', 'error');
        return;
    }

    const btn = document.getElementById('btnGenerate');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Đang tạo video...';

    // Setup WebSocket for progress
    connectWebSocket();

    // Render scene progress cards if not already rendered
    const container = document.getElementById('sceneProgress');
    if (!container.innerHTML.trim()) {
        renderGenerateSceneCards();
    }

    // Start generation
    try {
        const res = await fetch(`/api/project/${currentProjectId}/generate`, { method: 'POST' });
        const data = await res.json();
        showToast(data.message, 'info');
    } catch (e) {
        showToast('Lỗi bắt đầu tạo video: ' + e.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '🎬 Bắt đầu tạo Video';
    }
}

function connectWebSocket() {
    if (!currentProjectId) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${window.location.host}/ws/${currentProjectId}`);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateProgress(data);
    };

    ws.onclose = () => {
        console.log('WebSocket closed');
    };
}

function updateProgress(data) {
    const { scene_id, status, progress, message } = data;

    // Update progress bar
    const progressEl = document.getElementById(`progress-${scene_id}`);
    const msgEl = document.getElementById(`msg-${scene_id}`);
    const pctEl = document.getElementById(`pct-${scene_id}`);
    const badgeEl = document.getElementById(`badge-${scene_id}`);
    const cardEl = document.getElementById(`scene-card-${scene_id}`);

    if (progressEl) progressEl.style.width = `${progress}%`;
    if (msgEl) msgEl.textContent = message;
    if (pctEl) pctEl.textContent = `${progress}%`;

    if (cardEl) {
        cardEl.className = 'scene-card';
        if (status === 'done' || status === 'partial') cardEl.classList.add('done');
        else if (status === 'error') cardEl.classList.add('error');
        else cardEl.classList.add('processing');
    }

    if (badgeEl) {
        badgeEl.className = 'scene-badge';
        if (status === 'done' || status === 'partial') {
            badgeEl.classList.add('done');
            badgeEl.textContent = status === 'partial' ? 'Thiếu một số cảnh' : 'Hoàn thành';
        } else if (status === 'error') {
            badgeEl.classList.add('error');
            badgeEl.textContent = 'Lỗi';
        } else {
            badgeEl.classList.add('processing');
            badgeEl.textContent = 'Đang xử lý';
        }
    }

    // If final scene is done, show result
    if (scene_id === 'final' && (status === 'done' || status === 'partial')) {
        showResult();
        if (status === 'partial') showToast('Video thiếu một số cảnh; xem trạng thái từng cảnh.', 'error');
    }
}

// ═══════════════════════════════════════════
//  Result Tab
// ═══════════════════════════════════════════
function showResult() {
    const btn = document.getElementById('btnGenerate');
    btn.disabled = false;
    btn.innerHTML = '🎬 Tạo lại Video';

    document.getElementById('resultContent').innerHTML = `
        <div class="result-container">
            <div class="result-icon">🎬</div>
            <div class="result-title">Video đã hoàn thành!</div>
            <div class="result-subtitle">Video của bạn đã được tạo thành công</div>
            <div class="btn-group" style="justify-content:center">
                <a href="/api/project/${currentProjectId}/download" class="btn btn-primary" download>
                    📥 Tải Video MP4
                </a>
            </div>
        </div>
    `;

    switchTab('result');
    showToast('🎬 Video đã hoàn thành! Bạn có thể tải về.', 'success');
}

// ═══════════════════════════════════════════
//  Drag & Drop Setup & Init
// ═══════════════════════════════════════════
function initScriptDropZone() {
    const dropArea = document.getElementById('scriptDropArea');
    const editor = document.getElementById('scriptEditor');

    [dropArea, editor].forEach(el => {
        if (!el) return;
        el.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropArea) dropArea.style.borderColor = 'var(--accent-primary)';
        });
        el.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropArea && !dropArea.classList.contains('has-file')) {
                dropArea.style.borderColor = 'var(--border-glass)';
            }
        });
        el.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropArea && !dropArea.classList.contains('has-file')) {
                dropArea.style.borderColor = 'var(--border-glass)';
            }
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                uploadScriptFile(e.dataTransfer.files[0]);
            }
        });
    });
}

window.addEventListener('load', () => {
    checkStatus();
    initScriptDropZone();
});
