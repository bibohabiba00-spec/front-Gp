// زر ابدأ التحدث (Voice Input)
const startVoiceBtn = document.querySelector('.start-voice-btn');
startVoiceBtn.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('متصفحك لا يدعم التعرف على الصوت!');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ar-EG';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript;
        document.querySelector('.translated-text-area').textContent = speech;
    };

    recognition.onerror = (event) => {
        alert('حدث خطأ أثناء التعرف على الصوت: ' + event.error);
    };
});

// زر تحميل ملف صوتي
const uploadAudioBtn = document.querySelector('.upload-audio-btn');
uploadAudioBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const audio = new Audio(url);
            audio.play();
            alert('تم تشغيل الملف الصوتي: ' + file.name);
        }
    };
    input.click();
});

// زر تشغيل الصوت
const playAudioBtn = document.querySelector('.play-audio-btn');
playAudioBtn.addEventListener('click', () => {
    const text = document.querySelector('.translated-text-area').textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';
    speechSynthesis.speak(utterance);
});

// زر تحميل النص المكتوب
const downloadTranscriptBtn = document.querySelector('.download-transcript-btn');
downloadTranscriptBtn.addEventListener('click', () => {
    const text = document.querySelector('.translated-text-area').textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'translated_text.txt';
    link.click();
});

// Main controls (تكرار، بطيء، تشغيل الإشارة، ملء الشاشة)
const mainBtns = document.querySelectorAll('.main-control-btn');
mainBtns[0].addEventListener('click', () => alert('زر تكرار يعمل الآن'));
mainBtns[1].addEventListener('click', () => alert('زر بطيء يعمل الآن'));
mainBtns[2].addEventListener('click', () => alert('زر تشغيل الإشارة يعمل الآن'));
mainBtns[3].addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

// زر إتاحة الوصول (High Contrast)
const accessibilityBtn = document.getElementById('accessibility-btn');
accessibilityBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('high-contrast-mode');
});
// Accessibility
function toggleHighContrastMode() {
    document.body.classList.toggle('high-contrast-mode');
}
document.getElementById('accessibility-btn').addEventListener('click', function(event){
    event.preventDefault();
    toggleHighContrastMode();
});

// Typing effect for translation input
const typeTranslateBtn = document.querySelector('.type-translate-btn');
typeTranslateBtn.addEventListener('click', () => {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'اكتب هنا لترجمته...';
    inputField.style.padding = '10px';
    inputField.style.fontSize = '16px';
    inputField.style.borderRadius = '8px';
    inputField.style.border = '1px solid var(--primary)';
    inputField.style.width = '100%';
    inputField.style.marginTop = '10px';

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'ترجمة';
    submitBtn.style.backgroundColor = 'var(--button-gold)';
    submitBtn.style.color = 'var(--text-dark)';
    submitBtn.style.border = 'none';
    submitBtn.style.padding = '10px';
    submitBtn.style.borderRadius = '8px';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.fontWeight = '700';
    submitBtn.style.marginTop = '5px';

    submitBtn.addEventListener('click', () => {
        const text = inputField.value.trim();
        if(text) typeTextEffect(text);
        inputField.remove();
        submitBtn.remove();
    });

    typeTranslateBtn.parentElement.appendChild(inputField);
    typeTranslateBtn.parentElement.appendChild(submitBtn);
});

function typeTextEffect(text) {
    const area = document.querySelector('.translated-text-area');
    area.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
        area.textContent += text.charAt(index);
        index++;
        if(index >= text.length) clearInterval(interval);
    }, 50);
}
