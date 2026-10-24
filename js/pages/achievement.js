/**
 * pages/achievement.js - 成就系统：徽章 + 积分 + 排行榜
 */
App.register('achievement', async () => {
  const user = Storage.getCurrentUser();
  const ach = Storage.getUserAchievements(user.id);
  const board = Storage.getLeaderboard();
  const myRank = board.findIndex(b => b.userId === user.id) + 1;

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">🏆 成就中心</h1>
    <p class="page-subtitle">收集徽章，提升排名，成为语言达人</p>

    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-value">${ach.points}</div><div class="stat-label">总积分</div></div>
      <div class="stat-card"><div class="stat-icon">🎖️</div><div class="stat-value">${Object.keys(ach.badges).length}/${Badges.length}</div><div class="stat-label">已获徽章</div></div>
      <div class="stat-card"><div class="stat-icon">🏅</div><div class="stat-value">第 ${myRank} 名</div><div class="stat-label">当前排名</div></div>
    </div>

    <h2 class="section-title">🎖️ 我的徽章</h2>
    <div class="badges-grid" id="badges-grid"></div>

    <h2 class="section-title">🏆 积分排行榜</h2>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="leaderboard-table">
        <thead><tr><th>排名</th><th>用户</th><th>徽章</th><th>积分</th></tr></thead>
        <tbody id="leaderboard-body"></tbody>
      </table>
    </div>
  `;

  const grid = box.querySelector('#badges-grid');
  Badges.forEach(b => {
    const unlocked = !!ach.badges[b.id];
    const card = Utils.el('div', { class: `badge-card ${unlocked ? '' : 'locked'}` }, [
      Utils.el('div', { class: 'badge-icon' }, unlocked ? b.icon : '🔒'),
      Utils.el('div', { class: 'badge-name' }, b.name),
      Utils.el('div', { class: 'badge-desc' }, b.desc)
    ]);
    card.title = unlocked ? `解锁于 ${new Date(ach.badges[b.id].unlockedAt).toLocaleDateString('zh-CN')}` : `条件：${b.condition}`;
    grid.appendChild(card);
  });

  const tbody = box.querySelector('#leaderboard-body');
  board.forEach((b, i) => {
    const isMe = b.userId === user.id;
    const rankClass = i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : '';
    const tr = Utils.el('tr', { class: isMe ? 'leaderboard-row me' : '' }, [
      Utils.el('td', {}, Utils.el('span', { class: `rank-badge ${rankClass}` }, i + 1)),
      Utils.el('td', {}, [
        Utils.el('div', { style: 'display:flex;align-items:center;gap:8px' }, [
          Utils.avatar(b.name),
          Utils.el('span', { style: 'font-weight:600' }, b.name + (isMe ? ' (我)' : ''))
        ])
      ]),
      Utils.el('td', {}, `🎖️ ${b.badges}`),
      Utils.el('td', { style: 'font-weight:700' }, `⭐ ${b.points}`)
    ]);
    tbody.appendChild(tr);
  });

  return box;
});
