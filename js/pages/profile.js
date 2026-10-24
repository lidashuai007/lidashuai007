/**
 * pages/profile.js - 个人中心：资料编辑 + 进度概览
 */
App.register('profile', async () => {
  const user = Storage.getCurrentUser();
  const ach = Storage.getUserAchievements(user.id);
  const progress = Storage.getUserProgress(user.id);
  const activity = Storage.getUserActivity(user.id);
  const streak = Utils.calcStreak(activity);
  const meta = Courses.getMeta(user.targetLang || 'en');

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">👤 个人中心</h1>
    <p class="page-subtitle">管理你的账号与学习偏好</p>

    <div class="card" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px">
        ${avatarBigHTML(user.name)}
        <div>
          <h2 style="font-size:22px">${user.name}</h2>
          <p style="color:var(--text-light)">${user.email}</p>
          <p style="color:var(--text-light);font-size:13px;margin-top:4px">注册于 ${Utils.formatDate(user.createdAt)}</p>
        </div>
      </div>
      <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
        <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">${ach.points}</div><div style="font-size:12px;color:var(--text-light)">积分</div></div>
        <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">${streak}</div><div style="font-size:12px;color:var(--text-light)">连续天数</div></div>
        <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">${Object.keys(ach.badges).length}</div><div style="font-size:12px;color:var(--text-light)">徽章</div></div>
        <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">${Object.values(progress).filter(p=>p.completed).length}</div><div style="font-size:12px;color:var(--text-light)">完成课程</div></div>
      </div>
    </div>

    <h2 class="section-title">✏️ 编辑资料</h2>
    <div class="card">
      <form id="profile-form">
        <div class="form-group">
          <label class="form-label">昵称</label>
          <input class="form-input" name="name" value="${user.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">目标语言</label>
          <select class="form-select" name="targetLang">
            ${Courses.getLanguages().map(l => `<option value="${l.code}" ${l.code === user.targetLang ? 'selected' : ''}>${l.flag} ${l.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">当前等级</label>
          <select class="form-select" name="currentLevel" id="level-select">
            ${meta.levels.map(lv => `<option value="${lv}" ${lv === user.currentLevel ? 'selected' : ''}>${lv}</option>`).join('')}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">保存修改</button>
        <button type="button" class="btn btn-danger" id="reset-btn" style="margin-left:10px">重置学习数据</button>
      </form>
    </div>
  `;

  function avatarBigHTML(name) {
    const ch = (name || '?').charAt(0).toUpperCase();
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const bg = colors[Math.abs(hash) % colors.length];
    return `<div class="avatar" style="width:72px;height:72px;font-size:32px;background:${bg}">${ch}</div>`;
  }

  // 切换语言时更新等级选项
  box.querySelector('[name="targetLang"]').addEventListener('change', (e) => {
    const m = Courses.getMeta(e.target.value);
    const sel = box.querySelector('#level-select');
    sel.innerHTML = m.levels.map(lv => `<option value="${lv}">${lv}</option>`).join('');
  });

  box.querySelector('#profile-form').onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    Storage.updateUser(user.id, {
      name: fd.get('name').trim(),
      targetLang: fd.get('targetLang'),
      currentLevel: fd.get('currentLevel')
    });
    Utils.toast('资料已保存', 'success');
    App.buildShell();
    App.render();
  };

  box.querySelector('#reset-btn').onclick = async () => {
    const ok = await Utils.confirmDialog('确定要重置所有学习数据吗？此操作不可撤销！');
    if (!ok) return;
    Storage.saveProgress(user.id, {});
    const ach = Storage.getUserAchievements(user.id);
    Storage.saveUserAchievements(user.id, { points: 0, badges: {}, stats: ach.stats });
    Storage.set(Storage.KEYS.ACTIVITY, { ...(Storage.get(Storage.KEYS.ACTIVITY, {})), [user.id]: {} });
    Utils.toast('学习数据已重置', 'success');
    App.refreshTopbar();
    App.render();
  };

  return box;
});
