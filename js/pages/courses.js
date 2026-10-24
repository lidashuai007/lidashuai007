/**
 * pages/courses.js - 课程列表 + 课程详情
 */
App.register('courses', async () => {
  const user = Storage.getCurrentUser();
  const lang = user.targetLang || App.getLang();
  const meta = Courses.getMeta(lang);
  const courses = Courses.getCourses(lang);
  const progress = Storage.getUserProgress(user.id);

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">${meta.flag} ${meta.name}课程</h1>
    <p class="page-subtitle">从 ${meta.levels[0]} 到 ${meta.levels[meta.levels.length-1]}，系统化分级学习</p>
    <div class="level-grid" id="level-grid"></div>
  `;

  const grid = box.querySelector('#level-grid');
  courses.forEach(c => {
    const cp = progress[c.id] || {};
    const totalUnits = c.units.length;
    const doneUnits = c.units.filter(u => {
      return cp.vocab && cp.grammar !== null && cp.speaking !== null && cp.listening !== null;
    }).length;
    const pct = Math.round(doneUnits / totalUnits * 100);

    const card = Utils.el('div', { class: 'level-card', onclick: () => App.navigate(`course/${c.id}`) }, [
      Utils.el('div', { class: 'level-badge' }, c.level),
      Utils.el('div', { class: 'level-name' }, c.name),
      Utils.el('div', { class: 'level-desc' }, c.desc),
      Utils.el('div', { class: 'progress-bar', style: 'margin:10px 0' }, [
        Utils.el('div', { class: 'progress-fill', style: `width:${pct}%` })
      ]),
      Utils.el('div', { class: 'level-meta' }, [
        Utils.el('span', {}, `${doneUnits}/${totalUnits} 单元`),
        Utils.el('span', {}, cp.completed ? '✅ 已完成' : `${pct}%`)
      ])
    ]);
    grid.appendChild(card);
  });

  return box;
});

App.register('course', async (params) => {
  const user = Storage.getCurrentUser();
  const courseId = params[0];
  const lang = courseId.startsWith('ja_') ? 'ja' : courseId.startsWith('ko_') ? 'ko' : 'en';
  const course = Courses.getCourse(lang, courseId);
  if (!course) return Utils.el('div', { class: 'empty-state' }, [
    Utils.el('div', { class: 'empty-icon' }, '📚'),
    Utils.el('p', {}, '课程不存在')
  ]);

  const progress = Storage.getUserProgress(user.id);
  const meta = Courses.getMeta(lang);

  const box = Utils.el('div');
  box.innerHTML = `
    <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:16px">← 返回课程列表</button>
    <h1 class="page-title">${meta.flag} ${course.level} · ${course.name}</h1>
    <p class="page-subtitle">${course.desc}</p>
    <div class="unit-list" id="unit-list"></div>
  `;

  box.querySelector('#back-btn').onclick = () => App.navigate('courses');

  const list = box.querySelector('#unit-list');
  course.units.forEach((u, idx) => {
    const cp = progress[course.id] || {};
    const vocabDone = cp.vocab && cp.vocab.length > 0;
    const grammarDone = cp.grammar !== null && cp.grammar !== undefined;
    const speakingDone = cp.speaking !== null && cp.speaking !== undefined;
    const listeningDone = cp.listening !== null && cp.listening !== undefined;

    const card = Utils.el('div', { class: 'unit-card', onclick: () => App.navigate(`learn/${course.id}/${u.id}`) }, [
      Utils.el('div', { class: 'unit-info' }, [
        Utils.el('h3', {}, `第 ${idx+1} 课 · ${u.name}`),
        Utils.el('p', {}, `${u.vocab.length} 个单词 · ${u.grammar.length} 道语法 · ${u.speaking.length} 句口语 · ${u.listening.length} 段听力`)
      ]),
      Utils.el('div', { class: 'unit-stats' }, [
        Utils.el('span', { class: `stat-chip ${vocabDone ? 'done' : ''}` }, `📖 ${vocabDone ? '✓' : ''}`),
        Utils.el('span', { class: `stat-chip ${grammarDone ? 'done' : ''}` }, `✏️ ${grammarDone ? cp.grammar+'分' : ''}`),
        Utils.el('span', { class: `stat-chip ${speakingDone ? 'done' : ''}` }, `🎤 ${speakingDone ? cp.speaking+'分' : ''}`),
        Utils.el('span', { class: `stat-chip ${listeningDone ? 'done' : ''}` }, `🎧 ${listeningDone ? cp.listening+'分' : ''}`)
      ])
    ]);
    list.appendChild(card);
  });

  return box;
});
