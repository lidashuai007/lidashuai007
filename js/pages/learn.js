/**
 * pages/learn.js - 互动学习模块：单词记忆、语法练习、口语跟读、听力训练
 */
App.register('learn', async (params) => {
  const user = Storage.getCurrentUser();
  // 从课程 ID 前缀判断语言，避免与用户目标语言不匹配
  const courseId = params[0];
  const lang = courseId.startsWith('ja_') ? 'ja' : courseId.startsWith('ko_') ? 'ko' : 'en';
  const unitId = params[1];
  const course = Courses.getCourse(lang, courseId);
  const unit = Courses.getUnit(lang, courseId, unitId);
  if (!unit) return Utils.el('div', { class: 'empty-state' }, [Utils.el('div', { class: 'empty-icon' }, '📚'), Utils.el('p', {}, '课程单元不存在')]);

  const box = Utils.el('div');
  box.innerHTML = `
    <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:16px">← 返回课程</button>
    <div class="lesson-header">
      <div>
        <h1 style="font-size:22px;font-weight:800">${unit.name}</h1>
        <p style="color:var(--text-light);font-size:14px;margin-top:4px">${course.level} · ${course.name}</p>
      </div>
      <button class="btn btn-primary btn-sm" id="home-btn">🏠 返回首页</button>
    </div>
    <div class="module-tabs" id="module-tabs">
      <div class="module-tab active" data-tab="vocab">📖 单词记忆</div>
      <div class="module-tab" data-tab="grammar">✏️ 语法练习</div>
      <div class="module-tab" data-tab="speaking">🎤 口语跟读</div>
      <div class="module-tab" data-tab="listening">🎧 听力训练</div>
    </div>
    <div id="module-content"></div>
  `;

  box.querySelector('#back-btn').onclick = () => App.navigate(`course/${courseId}`);
  box.querySelector('#home-btn').onclick = () => App.navigate('home');

  const content = box.querySelector('#module-content');
  let currentTab = 'vocab';

  box.querySelectorAll('.module-tab').forEach(tab => {
    tab.onclick = () => {
      box.querySelectorAll('.module-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      loadModule(currentTab);
    };
  });

  function loadModule(tab) {
    Utils.clear(content);
    if (tab === 'vocab') renderVocab();
    else if (tab === 'grammar') renderGrammar();
    else if (tab === 'speaking') renderSpeaking();
    else if (tab === 'listening') renderListening();
  }

  // ===== 单词记忆 =====
  function renderVocab() {
    const cp = Storage.getCourseProgress(user.id, courseId);
    const mastered = new Set(cp.vocab || []);
    let idx = 0;
    let flipped = false;

    const wrap = Utils.el('div');
    wrap.innerHTML = `
      <div class="flashcard-container">
        <div class="flashcard" id="flashcard">
          <div class="flashcard-face flashcard-front">
            <button class="pronounce-btn" id="pron-btn">🔊</button>
            <div class="flashword" id="fw-word"></div>
            <div class="flashpos" id="fw-pos"></div>
            <div class="flash-hint">点击卡片查看释义</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="flashmeaning" id="fw-meaning"></div>
            <div class="flashexample" id="fw-example"></div>
          </div>
        </div>
      </div>
      <div class="flashcard-actions">
        <button class="know-btn know-no" data-know="no">😕 不认识</button>
        <button class="know-btn know-mid" data-know="mid">🤔 模糊</button>
        <button class="know-btn know-yes" data-know="yes">😊 认识</button>
      </div>
      <div class="flash-progress" id="fw-progress"></div>
    `;

    const card = wrap.querySelector('#flashcard');
    const showWord = () => {
      if (idx >= unit.vocab.length) {
        finishVocab();
        return;
      }
      const w = unit.vocab[idx];
      flipped = false;
      card.classList.remove('flipped');
      wrap.querySelector('#fw-word').textContent = w.word;
      wrap.querySelector('#fw-pos').textContent = w.pos;
      wrap.querySelector('#fw-meaning').textContent = w.meaning;
      wrap.querySelector('#fw-example').textContent = w.example;
      wrap.querySelector('#fw-progress').textContent = `第 ${idx+1} / ${unit.vocab.length} 个 · 已掌握 ${mastered.size} 个`;
    };

    card.onclick = (e) => {
      if (e.target.closest('.pronounce-btn')) return;
      flipped = !flipped;
      card.classList.toggle('flipped', flipped);
    };

    wrap.querySelector('#pron-btn').onclick = (e) => {
      e.stopPropagation();
      Speech.speak(unit.vocab[idx].word, lang).catch(() => Utils.toast('发音失败，请检查浏览器设置', 'error'));
    };

    wrap.querySelectorAll('.know-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const w = unit.vocab[idx];
        if (btn.dataset.know === 'yes') mastered.add(w.word);
        else mastered.delete(w.word);
        idx++;
        showWord();
      };
    });

    function finishVocab() {
      const upd = Storage.updateCourseProgress(user.id, courseId, { vocab: [...mastered] });
      Storage.addPoints(user.id, mastered.size * 5);
      Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1, duration: 2 });
      checkBadges();
      App.refreshTopbar();
      Utils.clear(content);
      content.appendChild(Utils.el('div', { class: 'card summary-box' }, [
        Utils.el('div', { style: 'font-size:60px' }, '🎉'),
        Utils.el('h2', { style: 'font-size:24px;margin:10px 0' }, '单词学习完成！'),
        Utils.el('div', { class: 'summary-score' }, mastered.size),
        Utils.el('p', { class: 'summary-label' }, `本次掌握 ${mastered.size} / ${unit.vocab.length} 个单词，获得 ${mastered.size * 5} 积分`),
        Utils.el('button', { class: 'btn btn-primary', onclick: () => { idx = 0; showWord(); } }, '再学一遍'),
        Utils.el('button', { class: 'btn btn-ghost', style: 'margin-left:10px', onclick: () => App.navigate(`course/${courseId}`) }, '返回课程')
      ]));
    }

    content.appendChild(wrap);
    showWord();
  }

  // ===== 语法练习 =====
  function renderGrammar() {
    let qIdx = 0;
    let score = 0;

    const wrap = Utils.el('div');
    wrap.innerHTML = `
      <div class="quiz-score">
        <span>第 <strong id="q-cur">1</strong> / ${unit.grammar.length} 题</span>
        <span>得分：<strong id="q-score">0</strong></span>
      </div>
      <div id="q-area"></div>
    `;

    const area = wrap.querySelector('#q-area');
    function showQ() {
      if (qIdx >= unit.grammar.length) { finishGrammar(); return; }
      Utils.clear(area);
      const q = unit.grammar[qIdx];
      wrap.querySelector('#q-cur').textContent = qIdx + 1;

      const question = Utils.el('div', { class: 'quiz-question' }, q.q);
      area.appendChild(question);

      if (q.type === 'choice') {
        const opts = Utils.el('div', { class: 'quiz-options' });
        q.options.forEach((opt, i) => {
          const o = Utils.el('div', { class: 'quiz-option' }, opt);
          o.onclick = () => {
            const correct = i === q.answer;
            opts.querySelectorAll('.quiz-option').forEach((el, j) => {
              if (j === q.answer) el.classList.add('correct');
              if (el === o && !correct) el.classList.add('wrong');
            });
            if (correct) score += 10;
            wrap.querySelector('#q-score').textContent = score;
            showExplain(q, correct);
          };
          opts.appendChild(o);
        });
        area.appendChild(opts);
      } else {
        const inp = Utils.el('input', { class: 'fill-input', placeholder: '请输入答案' });
        const submit = Utils.el('button', { class: 'btn btn-primary' }, '提交');
        area.appendChild(inp);
        area.appendChild(submit);
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        submit.onclick = check;
        function check() {
          const val = inp.value.trim();
          const correct = val.toLowerCase() === q.answer.toLowerCase();
          inp.classList.add(correct ? 'correct' : 'wrong');
          if (correct) score += 10;
          wrap.querySelector('#q-score').textContent = score;
          showExplain(q, correct);
        }
      }

      const explain = Utils.el('div', { class: 'quiz-explain', id: 'q-explain' });
      area.appendChild(explain);
    }

    function showExplain(q, correct) {
      const ex = area.querySelector('#q-explain');
      ex.innerHTML = `${correct ? '✅ 回答正确！' : '❌ 回答错误。'}<br>解析：${q.explain}`;
      ex.classList.add('show');
      const next = Utils.el('button', { class: 'btn btn-primary', style: 'margin-top:12px' },
        qIdx >= unit.grammar.length - 1 ? '查看结果' : '下一题');
      next.onclick = () => { qIdx++; showQ(); };
      area.appendChild(next);
    }

    function finishGrammar() {
      Storage.updateCourseProgress(user.id, courseId, { grammar: score });
      Storage.addPoints(user.id, score);
      Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1, duration: 3 });
      if (score === unit.grammar.length * 10) Storage.unlockBadge(user.id, 'perfect_score');
      checkBadges();
      App.refreshTopbar();
      Utils.clear(content);
      content.appendChild(Utils.el('div', { class: 'card summary-box' }, [
        Utils.el('div', { style: 'font-size:60px' }, score === unit.grammar.length * 10 ? '🏆' : '📝'),
        Utils.el('h2', { style: 'font-size:24px;margin:10px 0' }, '语法练习完成！'),
        Utils.el('div', { class: 'summary-score' }, score),
        Utils.el('p', { class: 'summary-label' }, `满分 ${unit.grammar.length * 10} 分，正确率 ${Math.round(score/(unit.grammar.length*10)*100)}%，获得 ${score} 积分`),
        Utils.el('button', { class: 'btn btn-primary', onclick: () => { qIdx = 0; score = 0; wrap.querySelector('#q-score').textContent = 0; showQ(); } }, '再练一次'),
        Utils.el('button', { class: 'btn btn-ghost', style: 'margin-left:10px', onclick: () => App.navigate(`course/${courseId}`) }, '返回课程')
      ]));
    }

    content.appendChild(wrap);
    showQ();
  }

  // ===== 口语跟读 =====
  function renderSpeaking() {
    let sIdx = 0;
    let totalScore = 0;
    let mediaRecorder = null;
    let audioChunks = [];
    let recording = false;
    let audioBlob = null;

    const wrap = Utils.el('div');
    wrap.innerHTML = `
      <div class="speaking-card" id="speak-card"></div>
    `;

    function showSentence() {
      if (sIdx >= unit.speaking.length) { finishSpeaking(); return; }
      const s = unit.speaking[sIdx];
      audioBlob = null;
      const card = wrap.querySelector('#speak-card');
      card.innerHTML = `
        <div style="font-size:13px;color:var(--text-lighter);margin-bottom:8px">第 ${sIdx+1} / ${unit.speaking.length} 句</div>
        <div class="speaking-sentence">${s.text}</div>
        <div class="speaking-trans">${s.trans}</div>
        <button class="btn btn-outline" id="demo-btn">🔊 听示范</button>
        <div class="record-btn" id="record-btn">🎤</div>
        <div style="font-size:13px;color:var(--text-lighter)" id="rec-status">点击麦克风开始录音</div>
        <div class="speaking-actions">
          <button class="btn btn-ghost" id="replay-btn" disabled>▶️ 回放录音</button>
          <button class="btn btn-primary" id="next-btn" disabled>下一句 →</button>
        </div>
        <div class="speaking-score" id="speak-score"></div>
      `;

      card.querySelector('#demo-btn').onclick = () => Speech.speak(s.text, lang).catch(() => {});

      const recBtn = card.querySelector('#record-btn');
      const recStatus = card.querySelector('#rec-status');
      const replayBtn = card.querySelector('#replay-btn');
      const nextBtn = card.querySelector('#next-btn');
      const scoreBox = card.querySelector('#speak-score');

      recBtn.onclick = async () => {
        if (!recording) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
              audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
              const url = URL.createObjectURL(audioBlob);
              replayBtn.disabled = false;
              replayBtn.dataset.url = url;
              // 模拟评分
              const dur = mediaRecorderDuration || 1;
              const simScore = Math.min(100, Math.round(60 + dur * 8 + Math.random() * 20));
              totalScore += simScore;
              scoreBox.classList.add('show');
              scoreBox.innerHTML = `<div style="font-size:32px;font-weight:800;color:var(--primary)">${simScore} 分</div><div style="font-size:13px;color:var(--text-light)">${simScore >= 80 ? '发音很棒！' : simScore >= 60 ? '继续加油！' : '多练习几遍~'}</div>`;
              nextBtn.disabled = false;
              stream.getTracks().forEach(t => t.stop());
            };
            mediaRecorder.start();
            mediaRecorderDuration = 0;
            recordingTimer = setInterval(() => { mediaRecorderDuration++; }, 1000);
            recording = true;
            recBtn.classList.add('recording');
            recBtn.textContent = '⏹';
            recStatus.textContent = '正在录音...再次点击停止';
          } catch (e) {
            Utils.toast('无法访问麦克风，请检查权限设置', 'error');
          }
        } else {
          mediaRecorder.stop();
          clearInterval(recordingTimer);
          recording = false;
          recBtn.classList.remove('recording');
          recBtn.textContent = '🎤';
          recStatus.textContent = '录音完成';
        }
      };

      replayBtn.onclick = () => {
        if (replayBtn.dataset.url) {
          const a = new Audio(replayBtn.dataset.url);
          a.play();
        }
      };

      nextBtn.onclick = () => { sIdx++; showSentence(); };
    }
    let mediaRecorderDuration = 0;
    let recordingTimer = null;

    function finishSpeaking() {
      const avg = Math.round(totalScore / unit.speaking.length);
      Storage.updateCourseProgress(user.id, courseId, { speaking: avg });
      Storage.addPoints(user.id, avg);
      Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1, duration: 3 });
      checkBadges();
      App.refreshTopbar();
      Utils.clear(content);
      content.appendChild(Utils.el('div', { class: 'card summary-box' }, [
        Utils.el('div', { style: 'font-size:60px' }, '🎤'),
        Utils.el('h2', { style: 'font-size:24px;margin:10px 0' }, '口语练习完成！'),
        Utils.el('div', { class: 'summary-score' }, avg),
        Utils.el('p', { class: 'summary-label' }, `平均得分 ${avg} 分，获得 ${avg} 积分`),
        Utils.el('button', { class: 'btn btn-primary', onclick: () => { sIdx = 0; totalScore = 0; showSentence(); } }, '再练一次'),
        Utils.el('button', { class: 'btn btn-ghost', style: 'margin-left:10px', onclick: () => App.navigate(`course/${courseId}`) }, '返回课程')
      ]));
    }

    content.appendChild(wrap);
    showSentence();
  }

  // ===== 听力训练 =====
  function renderListening() {
    let lIdx = 0;
    let score = 0;

    const wrap = Utils.el('div');
    wrap.innerHTML = `
      <div class="quiz-score">
        <span>第 <strong id="l-cur">1</strong> / ${unit.listening.length} 题</span>
        <span>得分：<strong id="l-score">0</strong></span>
      </div>
      <div id="l-area"></div>
    `;

    const area = wrap.querySelector('#l-area');
    function showL() {
      if (lIdx >= unit.listening.length) { finishListening(); return; }
      Utils.clear(area);
      const l = unit.listening[lIdx];
      wrap.querySelector('#l-cur').textContent = lIdx + 1;

      const playBtn = Utils.el('button', { class: 'audio-btn', id: 'play-btn' }, '▶️');
      playBtn.onclick = () => {
        playBtn.classList.add('playing');
        Speech.speak(l.text, lang).finally(() => playBtn.classList.remove('playing'));
      };

      const qCard = Utils.el('div', { class: 'listening-card' }, [
        Utils.el('p', { style: 'color:var(--text-light);font-size:14px' }, '点击播放听力内容'),
        playBtn,
        Utils.el('div', { class: 'quiz-question', style: 'margin-top:20px' }, l.q)
      ]);
      area.appendChild(qCard);

      const opts = Utils.el('div', { class: 'quiz-options' });
      l.options.forEach((opt, i) => {
        const o = Utils.el('div', { class: 'quiz-option' }, opt);
        o.onclick = () => {
          const correct = i === l.answer;
          opts.querySelectorAll('.quiz-option').forEach((el, j) => {
            if (j === l.answer) el.classList.add('correct');
            if (el === o && !correct) el.classList.add('wrong');
          });
          if (correct) score += 10;
          wrap.querySelector('#l-score').textContent = score;
          const next = Utils.el('button', { class: 'btn btn-primary', style: 'margin-top:12px' },
            lIdx >= unit.listening.length - 1 ? '查看结果' : '下一题');
          next.onclick = () => { lIdx++; showL(); };
          area.appendChild(next);
        };
        opts.appendChild(o);
      });
      area.appendChild(opts);
    }

    function finishListening() {
      Storage.updateCourseProgress(user.id, courseId, { listening: score });
      Storage.addPoints(user.id, score);
      Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1, duration: 3 });
      if (score === unit.listening.length * 10) Storage.unlockBadge(user.id, 'perfect_score');
      checkBadges();
      App.refreshTopbar();
      Utils.clear(content);
      content.appendChild(Utils.el('div', { class: 'card summary-box' }, [
        Utils.el('div', { style: 'font-size:60px' }, score === unit.listening.length * 10 ? '🏆' : '🎧'),
        Utils.el('h2', { style: 'font-size:24px;margin:10px 0' }, '听力训练完成！'),
        Utils.el('div', { class: 'summary-score' }, score),
        Utils.el('p', { class: 'summary-label' }, `满分 ${unit.listening.length * 10} 分，正确率 ${Math.round(score/(unit.listening.length*10)*100)}%，获得 ${score} 积分`),
        Utils.el('button', { class: 'btn btn-primary', onclick: () => { lIdx = 0; score = 0; wrap.querySelector('#l-score').textContent = 0; showL(); } }, '再练一次'),
        Utils.el('button', { class: 'btn btn-ghost', style: 'margin-left:10px', onclick: () => App.navigate(`course/${courseId}`) }, '返回课程')
      ]));
    }

    content.appendChild(wrap);
    showL();
  }

  // 徽章检测
  function checkBadges() {
    const ach = Storage.getUserAchievements(user.id);
    const progress = Storage.getUserProgress(user.id);
    const mastered = Object.values(progress).reduce((s, p) => s + (p.vocab?.length || 0), 0);
    const completed = Object.values(progress).filter(p => p.completed).length;
    const activity = Storage.getUserActivity(user.id);
    const streak = Utils.calcStreak(activity);

    const checks = [
      { id: 'first_lesson', cond: completed >= 1 },
      { id: 'streak_7', cond: streak >= 7 },
      { id: 'streak_30', cond: streak >= 30 },
      { id: 'words_50', cond: mastered >= 50 },
      { id: 'words_200', cond: mastered >= 200 },
      { id: 'points_1000', cond: ach.points >= 1000 }
    ];
    checks.forEach(c => {
      if (c.cond && Storage.unlockBadge(user.id, c.id)) {
        const b = Badges.find(x => x.id === c.id);
        Utils.toast(`🎉 解锁徽章：${b.name}`, 'success', 3000);
      }
    });

    // 练习次数类
    const counts = { grammar: 0, speaking: 0, listening: 0 };
    Object.values(progress).forEach(p => {
      if (p.grammar !== null) counts.grammar++;
      if (p.speaking !== null) counts.speaking++;
      if (p.listening !== null) counts.listening++;
    });
    if (counts.grammar >= 10) Storage.unlockBadge(user.id, 'grammar_master');
    if (counts.speaking >= 10) Storage.unlockBadge(user.id, 'speaking_star');
    if (counts.listening >= 10) Storage.unlockBadge(user.id, 'listening_pro');
    if (counts.grammar >= 5 && counts.speaking >= 5 && counts.listening >= 5 && mastered >= 5) {
      Storage.unlockBadge(user.id, 'all_rounder');
    }

    const posts = Storage.getPosts().filter(p => p.userId === user.id).length;
    if (posts >= 5) Storage.unlockBadge(user.id, 'community_hero');
  }

  loadModule(currentTab);
  return box;
});
