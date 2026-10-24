/**
 * pages/community.js - 社区交流：发帖、点赞、评论
 */
App.register('community', async () => {
  const user = Storage.getCurrentUser();

  const box = Utils.el('div');
  box.innerHTML = `
    <h1 class="page-title">💬 学习社区</h1>
    <p class="page-subtitle">与全球学习者交流心得，分享进步</p>

    <div class="card" style="margin-bottom:20px">
      <div class="post-input">
        <input class="form-input" id="post-title" placeholder="帖子标题...">
        <textarea class="form-textarea" id="post-content" placeholder="分享你的学习心得或问题..."></textarea>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <select class="form-select" id="post-tag" style="width:auto">
            <option value="英语">🇬🇧 英语</option>
            <option value="日语">🇯🇵 日语</option>
            <option value="韩语">🇰🇷 韩语</option>
            <option value="综合">🌍 综合</option>
          </select>
          <button class="btn btn-primary" id="post-submit">发布</button>
        </div>
      </div>
    </div>

    <div class="post-list" id="post-list"></div>
  `;

  function renderPosts() {
    const list = box.querySelector('#post-list');
    Utils.clear(list);
    const posts = Storage.getPosts();
    if (posts.length === 0) {
      list.appendChild(Utils.el('div', { class: 'empty-state' }, [
        Utils.el('div', { class: 'empty-icon' }, '💬'),
        Utils.el('p', {}, '还没有帖子，快来发布第一条吧！')
      ]));
      return;
    }
    posts.forEach(p => {
      const author = Storage.findUserById(p.userId) || { name: '匿名' };
      const liked = p.likes?.includes(user.id);
      const card = Utils.el('div', { class: 'post-card' }, [
        Utils.el('div', { class: 'post-header' }, [
          Utils.avatar(author.name),
          Utils.el('div', {}, [
            Utils.el('div', { class: 'post-author' }, author.name),
            Utils.el('div', { class: 'post-time' }, Utils.formatTime(p.createdAt))
          ]),
          Utils.el('span', { class: 'post-tag' }, p.tag)
        ]),
        Utils.el('div', { style: 'font-weight:700;margin-bottom:6px' }, p.title),
        Utils.el('div', { class: 'post-content' }, p.content),
        Utils.el('div', { class: 'post-actions' }, [
          Utils.el('span', { class: `post-action ${liked ? 'liked' : ''}`, id: `like-${p.id}` }, `❤️ ${p.likes?.length || 0}`),
          Utils.el('span', { class: 'post-action', id: `comment-toggle-${p.id}` }, `💬 ${p.comments?.length || 0}`)
        ]),
        Utils.el('div', { class: 'post-comments', id: `comments-${p.id}`, style: 'display:none' })
      ]);

      card.querySelector(`#like-${p.id}`).onclick = () => {
        const posts2 = Storage.getPosts();
        const post = posts2.find(x => x.id === p.id);
        if (!post.likes) post.likes = [];
        if (post.likes.includes(user.id)) {
          post.likes = post.likes.filter(uid => uid !== user.id);
        } else {
          post.likes.push(user.id);
        }
        Storage.updatePost(p.id, { likes: post.likes });
        renderPosts();
      };

      card.querySelector(`#comment-toggle-${p.id}`).onclick = () => {
        const c = card.querySelector(`#comments-${p.id}`);
        c.style.display = c.style.display === 'none' ? 'block' : 'none';
        if (c.style.display === 'block') renderComments(p.id, c);
      };

      list.appendChild(card);
    });
  }

  function renderComments(postId, container) {
    Utils.clear(container);
    const post = Storage.getPosts().find(p => p.id === postId);
    (post.comments || []).forEach(c => {
      const author = Storage.findUserById(c.userId) || { name: '匿名' };
      container.appendChild(Utils.el('div', { class: 'comment' }, [
        Utils.avatar(author.name),
        Utils.el('div', { class: 'comment-body' }, [
          Utils.el('span', { class: 'comment-author' }, author.name + ' '),
          Utils.el('span', { style: 'font-size:11px;color:var(--text-lighter)' }, Utils.formatTime(c.createdAt)),
          Utils.el('div', { class: 'comment-text' }, c.text)
        ])
      ]));
    });
    const inputRow = Utils.el('div', { style: 'display:flex;gap:8px;margin-top:10px' }, [
      Utils.el('input', { class: 'form-input', id: `cmt-input-${postId}`, placeholder: '写下你的评论...' }),
      Utils.el('button', { class: 'btn btn-primary btn-sm' }, '发送')
    ]);
    inputRow.querySelector('button').onclick = () => {
      const inp = inputRow.querySelector('input');
      const text = inp.value.trim();
      if (!text) return;
      const posts2 = Storage.getPosts();
      const post = posts2.find(p => p.id === postId);
      if (!post.comments) post.comments = [];
      post.comments.push({ userId: user.id, text, createdAt: Date.now() });
      Storage.updatePost(postId, { comments: post.comments });
      renderComments(postId, container);
    };
    container.appendChild(inputRow);
  }

  box.querySelector('#post-submit').onclick = () => {
    const title = box.querySelector('#post-title').value.trim();
    const content = box.querySelector('#post-content').value.trim();
    const tag = box.querySelector('#post-tag').value;
    if (!title || !content) { Utils.toast('请填写标题和内容', 'error'); return; }
    Storage.addPost({
      id: Utils.uid('post'), userId: user.id, title, content, tag,
      likes: [], comments: [], createdAt: Date.now()
    });
    Storage.addPoints(user.id, 5);
    Storage.recordActivity(user.id, Utils.todayStr(), { tasks: 1 });
    App.refreshTopbar();
    box.querySelector('#post-title').value = '';
    box.querySelector('#post-content').value = '';
    Utils.toast('发布成功 +5 积分', 'success');
    renderPosts();
  };

  renderPosts();
  return box;
});
