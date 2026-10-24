/**
 * pages/home.js - 首页：统计概览 + 个性化推荐
 */
App.register('home', async () => {
  const user = Storage.getCurrentUser();
  const ach = Storage.getUserAchievements(user.id);
  const progress = Storage.getUserProgress(user.id);
  const activity = Storage.getUserActivity(user.id);
  const streak = Utils.calcStreak(activity);

  // 统计
  const completedCourses = Object.values(progress).filter(p => p.completed).length;
  const masteredWords = Object.values(progress).reduce((s, p) => s + (p.vocab?.length || 0), 0);
  const todayTasks = (activity[Utils.todayStr()]?.tasks || 0);

  // 推荐
  const lang = user.targetLang || App.getLang();
  const courses = Courses.getCourses(lang);
  const meta = Courses.getMeta(lang);
  const currentLevelIdx = meta.levels.indexOf(user.currentLevel);
  const recommended = [];
  for (const c of courses) {
    const cp = progress[c.id];
    const levelIdx = meta.levels.indexOf(c.level);
    if (!cp || !cp.completed) {
      if (levelIdx >= currentLevelIdx - 1 && recommended.length < 4) {
        recommended.push(c);
      }
    }
  }
  if (recommended.length === 0) recommended.push(courses[0]);

  // 薄弱环节检测
  const moduleScores = { grammar: [], speaking: [], listening: [] };
  Object.values(progress).forEach(p => {
    if (p.grammar !== null) moduleScores.grammar.push(p.grammar);
    if (p.speaking !== null) moduleScores.speaking.push(p.speaking);
    if (p.listening !== null) moduleScores.listening.push(p.listening);
  });
  const avg = arr => arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 100;
  const weakModules = [];
  if (avg(moduleScores.grammar) < 70) weakModules.push({ name: '语法', icon: '✏️' });
  if (avg(moduleScores.speaking) < 70) weakModules.push({ name: '口语', icon: '🎤' });
  if (avg(moduleScores.listening) < 70) weakModules.push({ name: '听力', icon: '🎧' });

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">你好，${user.name} 👋</h1>
    <p class="page-subtitle">${streak > 0 ? `已连续学习 ${streak} 天，继续加油！` : '今天也要开始学习哦~'} 当前学习：${meta.flag} ${meta.name} ${user.currentLevel}</p>

    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-value">${streak}</div><div class="stat-label">连续学习天数</div></div>
      <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-value">${completedCourses}</div><div class="stat-label">已完成课程</div></div>
      <div class="stat-card"><div class="stat-icon">🔤</div><div class="stat-value">${masteredWords}</div><div class="stat-label">掌握单词</div></div>
      <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-value">${ach.points}</div><div class="stat-label">总积分</div></div>
    </div>

    <h2 class="section-title">🎯 为你推荐</h2>
    <div class="recommend-grid" id="recommend-grid"></div>

    ${weakModules.length ? `
      <h2 class="section-title">💪 薄弱环节加强</h2>
      <div class="recommend-grid">
        ${weakModules.map(m => `
          <div class="recommend-card" data-module="${m.name}">
            <div class="recommend-tag">复习建议</div>
            <div class="recommend-title">${m.icon} ${m.name}练习</div>
            <div class="recommend-desc">你的${m.name}正确率有待提升，多加练习！</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <h2 class="section-title">📊 今日学习</h2>
    <div class="card">
      <p>今日已完成 <strong>${todayTasks}</strong> 项任务，继续保持！</p>
      <div style="margin-top:12px;height:8px;background:var(--border);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:${Math.min(100, todayTasks*25)}%;background:var(--bg-grad);transition:width .5s"></div>
      </div>
    </div>
  `;

  const grid = box.querySelector('#recommend-grid');
  recommended.forEach(c => {
    const cp = progress[c.id] || {};
    const totalUnits = c.units.length;
    const doneUnits = c.units.filter(u => {
      const up = progress[c.id];
      return up && up.vocab && up.grammar !== null && up.speaking !== null && up.listening !== null;
    }).length;
    const card = Utils.el('div', { class: 'recommend-card', onclick: () => App.navigate(`course/${c.id}`) }, [
      Utils.el('div', { class: 'recommend-tag' }, `${meta.flag} ${c.level}`),
      Utils.el('div', { class: 'recommend-title' }, c.name),
      Utils.el('div', { class: 'recommend-desc' }, c.desc),
      Utils.el('div', { style: 'margin-top:12px' }, [
        Utils.el('div', { class: 'progress-bar' }, [
          Utils.el('div', { class: 'progress-fill', style: `width:${(doneUnits/totalUnits*100)}%` })
        ]),
        Utils.el('div', { style: 'font-size:12px;color:var(--text-lighter);margin-top:4px' }, `${doneUnits}/${totalUnits} 单元`)
      ])
    ]);
    grid.appendChild(card);
  });

  box.querySelectorAll('[data-module]').forEach(el => {
    el.addEventListener('click', () => App.navigate('courses'));
  });

  return box;
});
