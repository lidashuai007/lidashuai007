/**
 * speech.js - 语音合成（TTS）封装
 * 支持英语、日语、韩语发音
 */
const Speech = (() => {
  const LANG_MAP = {
    en: { lang: 'en-US', label: 'English' },
    ja: { lang: 'ja-JP', label: '日本語' },
    ko: { lang: 'ko-KR', label: '한국어' }
  };

  let voices = [];

  function loadVoices() {
    voices = speechSynthesis.getVoices();
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  function pickVoice(langCode) {
    if (voices.length === 0) loadVoices();
    const target = LANG_MAP[langCode] ? LANG_MAP[langCode].lang : 'en-US';
    // 优先找精确匹配的语音
    let v = voices.find(v => v.lang === target);
    if (!v) v = voices.find(v => v.lang.startsWith(target.split('-')[0]));
    if (!v) v = voices.find(v => v.lang.startsWith('en'));
    return v;
  }

  function speak(text, langCode = 'en', rate = 0.9) {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('浏览器不支持语音合成'));
        return;
      }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(langCode);
      if (v) u.voice = v;
      u.lang = LANG_MAP[langCode] ? LANG_MAP[langCode].lang : 'en-US';
      u.rate = rate;
      u.pitch = 1;
      u.onend = resolve;
      u.onerror = reject;
      speechSynthesis.speak(u);
    });
  }

  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  return { speak, stop, LANG_MAP };
})();
