/**
 * pages/auth.js - 登录注册页面
 */
App.register('auth', async () => {
  const container = Utils.el('div', { class: 'auth-page' });
  let mode = 'login';

  function render() {
    Utils.clear(container);
    const isLogin = mode === 'login';
    const card = Utils.el('div', { class: 'auth-card' }, [
      Utils.el('div', { class: 'logo', style: 'font-size:32px;text-align:center;margin-bottom:8px' }, '🌍 LangLearn'),
      Utils.el('h1', { class: 'auth-title' }, isLogin ? '欢迎回来' : '创建账号'),
      Utils.el('p', { class: 'auth-sub' }, isLogin ? '登录开始你的语言学习之旅' : '加入我们，开启多语种学习'),
      Utils.el('form', { class: 'auth-form', onsubmit: handleSubmit }, [
        isLogin ? '' : Utils.el('div', { class: 'form-group' }, [
          Utils.el('label', { class: 'form-label' }, '昵称'),
          Utils.el('input', { class: 'form-input', name: 'name', placeholder: '请输入昵称', required: true })
        ]),
        Utils.el('div', { class: 'form-group' }, [
          Utils.el('label', { class: 'form-label' }, '邮箱'),
          Utils.el('input', { class: 'form-input', name: 'email', type: 'email', placeholder: '请输入邮箱', required: true })
        ]),
        Utils.el('div', { class: 'form-group' }, [
          Utils.el('label', { class: 'form-label' }, '密码'),
          Utils.el('input', { class: 'form-input', name: 'password', type: 'password', placeholder: '请输入密码（至少6位）', required: true, minlength: 6 })
        ]),
        Utils.el('button', { class: 'btn btn-primary btn-lg btn-block', type: 'submit' }, isLogin ? '登录' : '注册'),
        Utils.el('p', { class: 'auth-switch' }, [
          isLogin ? '还没有账号？' : '已有账号？',
          Utils.el('a', { onclick: (e) => { e.preventDefault(); mode = isLogin ? 'register' : 'login'; render(); } },
            isLogin ? '立即注册' : '去登录')
        ])
      ])
    ]);
    container.appendChild(card);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email').trim();
    const password = fd.get('password');
    if (!Utils.validateEmail(email)) { Utils.toast('请输入有效的邮箱地址', 'error'); return; }

    if (mode === 'login') {
      const user = Storage.findUserByEmail(email);
      if (!user) { Utils.toast('账号不存在，请先注册', 'error'); return; }
      if (user.password !== Utils.simpleHash(password)) { Utils.toast('密码错误', 'error'); return; }
      Storage.setSession(user.id);
      Utils.toast(`欢迎回来，${user.name}！`, 'success');
      App.buildShell();
      location.hash = 'home';
    } else {
      if (Storage.findUserByEmail(email)) { Utils.toast('该邮箱已被注册', 'error'); return; }
      const name = fd.get('name').trim();
      const user = {
        id: Utils.uid('u'),
        email, name,
        password: Utils.simpleHash(password),
        targetLang: 'en',
        currentLevel: 'A1',
        createdAt: Date.now()
      };
      Storage.createUser(user);
      Storage.setSession(user.id);
      Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1, duration: 0 });
      Utils.toast('注册成功，欢迎加入！', 'success');
      App.buildShell();
      location.hash = 'home';
    }
  }

  render();
  return container;
});
