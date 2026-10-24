/**
 * pages/progress.js - 学习进度仪表盘（环形图、柱状图、热力图）
 */
App.register('progress', async () => {
  const user = Storage.getCurrentUser();
  const progress = Storage.getUserProgress(user.id);
  const activity = Storage.getUserActivity(user.id);
  const ach = Storage.getUserAchievements(user.id);
  const streak = Utils.calcStreak(activity);

  const completedCourses = Object.values(progress).filter(p => p.completed).length;
  const masteredWords = Object.values(progress).reduce((s, p) => s + (p.vocab?.length || 0), 0);
  const totalTasks = Object.values(activity).reduce((s, d) => s + d.tasks, 0);
  const totalDuration = Object.values(activity).reduce((s, d) => s + d.duration, 0);

  // 各语言完成度
  const langProgress = {};
  Courses.getLanguages().forEach(l => {
    const courses = Courses.getCourses(l.code);
    let total = 0, done = 0;
    courses.forEach(c => {
      const cp = progress[c.id];
      if (cp && cp.completed) done++;
      total += c.units.length;
    });
    langProgress[l.code] = { name: l.name, flag: l.flag, total, done, pct: total ? Math.round(done/total*100) : 0 };
  });

  // 最近7天学习时长
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    last7.push({ day: ['日','一','二','三','四','五','六'][d.getDay()], dur: activity[ds]?.duration || 0 });
  }
  const maxDur = Math.max(...last7.map(d => d.dur), 1);

  // 最近30天热力图
  const heatDays = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const t = activity[ds]?.tasks || 0;
    const level = t === 0 ? 0 : t <= 1 ? 1 : t <= 3 ? 2 : t <= 5 ? 3 : 4;
    heatDays.push(level);
  }

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">📊 学习进度</h1>
    <p class="page-subtitle">追踪你的学习足迹，见证每一步成长</p>

    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-value">${streak}</div><div class="stat-label">连续学习天数</div></div>
      <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-value">${completedCourses}</div><div class="stat-label">完成课程</div></div>
      <div class="stat-card"><div class="stat-icon">🔤</div><div class="stat-value">${masteredWords}</div><div class="stat-label">掌握单词</div></div>
      <div class="stat-card"><div class="stat-icon">⏱️</div><div class="stat-value">${totalDuration}</div><div class="stat-label">学习时长(分钟)</div></div>
    </div>

    <div class="dashboard-grid">
      <div class="chart-card">
        <h3 style="margin-bottom:16px">各语言学习进度</h3>
        <div class="ring-chart" id="ring-chart"></div>
      </div>
      <div class="chart-card">
        <h3 style="margin-bottom:16px">学习时长排行</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${Object.values(langProgress).map(l => `
            <div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                <span>${l.flag} ${l.name}</span><span>${l.pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${l.pct}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="chart-card" style="margin-top:20px">
      <h3 style="margin-bottom:16px">最近 7 天学习时长（分钟）</h3>
      <div class="bar-chart" id="bar-chart"></div>
    </div>

    <div class="chart-card" style="margin-top:20px">
      <h3 style="margin-bottom:16px">最近 30 天学习热力图</h3>
      <div class="heatmap" id="heatmap"></div>
      <div style="display:flex;gap:6px;align-items:center;margin-top:12px;font-size:12px;color:var(--text-light)">
        <span>少</span>
        <div class="heat-cell" style="width:14px;height:14px"></div>
        <div class="heat-cell l1" style="width:14px;height:14px"></div>
        <div class="heat-cell l2" style="width:14px;height:14px"></div>
        <div class="heat-cell l3" style="width:14px;height:14px"></div>
        <div class="heat-cell l4" style="width:14px;height:14px"></div>
        <span>多</span>
      </div>
    </div>
  `;

  // 环形图
  const ring = box.querySelector('#ring-chart');
  const radius = 50, circ = 2 * Math.PI * radius;
  Object.values(langProgress).forEach(l => {
    const offset = circ - (l.pct / 100) * circ;
    const item = Utils.el('div', { class: 'ring-item' }, [
      Utils.el('div', { style: 'position:relative;width:120px;height:120px;margin:0 auto' }, [
        Utils.el('svg', { class: 'ring-svg', width: 120, height: 120 }, [
          Utils.el('circle', { class: 'ring-bg', cx: 60, cy: 60, r: radius }),
          Utils.el('circle', { class: 'ring-fill', cx: 60, cy: 60, r: radius,
            stroke: l.code === 'en' ? '#667eea' : l.code === 'ja' ? '#f093fb' : '#43e97b',
            'stroke-dasharray': circ, 'stroke-dashoffset': offset })
        ]),
        Utils.el('div', { style: 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center' }, [
          Utils.el('div', { class: 'ring-value' }, `${l.pct}%`),
          Utils.el('div', { style: 'font-size:11px;color:var(--text-lighter)' }, l.flag)
        ])
      ]),
      Utils.el('div', { class: 'ring-label' }, l.name)
    ]);
    ring.appendChild(item);
  });

  // 柱状图
  const bar = box.querySelector('#bar-chart');
  last7.forEach(d => {
    const h = Math.max(4, (d.dur / maxDur) * 140);
    bar.appendChild(Utils.el('div', { class: 'bar-col' }, [
      Utils.el('div', { class: 'bar-fill', style: `height:${h}px`, title: `${d.dur} 分钟` }),
      Utils.el('div', { class: 'bar-label' }, d.day)
    ]));
  });

  // 热力图
  const heat = box.querySelector('#heatmap');
  heatDays.forEach(lv => {
    heat.appendChild(Utils.el('div', { class: `heat-cell${lv ? ' l'+lv : ''}` }));
  });

  return box;
});
