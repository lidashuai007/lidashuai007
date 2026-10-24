/**
 * app.js - 主应用入口：路由、导航、SPA 骨架
 */
const App = (() => {
  const routes = {};
  let currentLang = localStorage.getItem('langlearn_lang') || 'en';
  const NAV_ITEMS = [
    { id: 'home', name: '首页', icon: '🏠', route: 'home' },
    { id: 'courses', name: '课程', icon: '📚', route: 'courses' },
    { id: 'progress', name: '进度', icon: '📊', route: 'progress' },
    { id: 'community', name: '社区', icon: '💬', route: 'community' },
    { id: 'achievement', name: '成就', icon: '🏆', route: 'achievement' },
    { id: 'profile', name: '我的', icon: '👤', route: 'profile' }
  ];

  function register(route, handler) {
    routes[route] = handler;
  }

  function getRoute() {
    const hash = location.hash.slice(1) || 'home';
    const [route, ...params] = hash.split('/');
    return { route, params };
  }

  function navigate(route) {
    location.hash = route;
  }

  async function render() {
    const { route, params } = getRoute();
    const user = Storage.getCurrentUser();
    const publicRoutes = ['auth'];
    if (!user && !publicRoutes.includes(route)) {
      location.hash = 'auth';
      return;
    }
    if (user && route === 'auth') {
      location.hash = 'home';
      return;
    }

    // 未登录时直接渲染认证页到 #app
    if (!user) {
      const app = document.getElementById('app');
      Utils.clear(app);
      const handler = routes[route];
      if (handler) {
        const view = await handler(params);
        if (view) {
          if (typeof view === 'string') app.innerHTML = view;
          else app.appendChild(view);
        }
      }
      return;
    }

    const main = document.getElementById('main-content');
    if (!main) return;
    Utils.clear(main);

    const handler = routes[route];
    if (handler) {
      const view = await handler(params);
      if (view) {
        if (typeof view === 'string') main.innerHTML = view;
        else main.appendChild(view);
        main.firstElementChild?.classList.add('page-anim');
      }
    } else {
      main.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>页面不存在</p></div>';
    }
    updateActiveNav(route);
    window.scrollTo(0, 0);
  }

  function updateActiveNav(route) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === route);
    });
    document.querySelectorAll('.mobile-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === route);
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('langlearn_lang', lang);
    const user = Storage.getCurrentUser();
    if (user) Storage.updateUser(user.id, { targetLang: lang });
    render();
  }

  function getLang() { return currentLang; }

  function buildShell() {
    const app = document.getElementById('app');
    const user = Storage.getCurrentUser();
    if (!user) return;

    app.innerHTML = `
      <header class="topbar">
        <div class="topbar-left">
          <div class="logo">🌍 LangLearn</div>
          <div class="lang-switch" id="lang-switch">
            ${Courses.getLanguages().map(l => `
              <span class="lang-chip ${l.code === currentLang ? 'active' : ''}" data-lang="${l.code}">${l.flag} ${l.name}</span>
            `).join('')}
          </div>
        </div>
        <div class="topbar-right">
          <div class="points-badge">⭐ <span id="user-points">${Storage.getUserAchievements(user.id).points}</span></div>
          <div class="user-menu">
            <div class="user-menu-trigger" id="user-trigger">
              ${avatarHTML(user.name)}
              <span class="user-name">${user.name}</span>
            </div>
            <div class="user-dropdown" id="user-dropdown">
              <div class="user-dropdown-item" data-route="profile">👤 个人中心</div>
              <div class="user-dropdown-item" data-route="achievement">🏆 我的成就</div>
              <div class="user-dropdown-item" id="logout-btn">🚪 退出登录</div>
            </div>
          </div>
        </div>
      </header>
      <nav class="sidebar">
        ${NAV_ITEMS.map(n => `
          <div class="nav-item" data-route="${n.route}">
            <span class="nav-icon">${n.icon}</span><span>${n.name}</span>
          </div>
        `).join('')}
      </nav>
      <div class="main-content" id="main-content"></div>
      <nav class="mobile-nav">
        <div class="mobile-nav-items">
          ${NAV_ITEMS.map(n => `
            <div class="mobile-nav-item" data-route="${n.route}">
              <span class="nav-icon">${n.icon}</span><span>${n.name}</span>
            </div>
          `).join('')}
        </div>
      </nav>
    `;

    // 绑定导航
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.route));
    });
    document.querySelectorAll('.lang-chip').forEach(el => {
      el.addEventListener('click', () => setLang(el.dataset.lang));
    });
    document.getElementById('user-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('user-dropdown').classList.toggle('show');
    });
    document.addEventListener('click', () => {
      document.getElementById('user-dropdown')?.classList.remove('show');
    });
    document.getElementById('logout-btn').addEventListener('click', async () => {
      const ok = await Utils.confirmDialog('确定要退出登录吗？');
      if (ok) {
        Storage.clearSession();
        location.hash = 'auth';
      }
    });
  }

  function avatarHTML(name) {
    const ch = (name || '?').charAt(0).toUpperCase();
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#feb47b'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const bg = colors[Math.abs(hash) % colors.length];
    return `<div class="avatar" style="background:${bg}">${ch}</div>`;
  }

  function refreshTopbar() {
    const user = Storage.getCurrentUser();
    if (!user) return;
    const pts = Storage.getUserAchievements(user.id).points;
    const el = document.getElementById('user-points');
    if (el) el.textContent = pts;
  }

  function init() {
    window.addEventListener('hashchange', render);
    if (!location.hash) location.hash = 'home';
    if (Storage.getCurrentUser()) buildShell();
    render();
  }

  return { register, navigate, render, setLang, getLang, init, buildShell, refreshTopbar, NAV_ITEMS };
})();
