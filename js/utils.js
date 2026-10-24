/**
 * utils.js - 工具函数集
 */
const Utils = (() => {
  function uid(prefix = 'id') {
    return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function todayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';
    if (diff < 604800) return Math.floor(diff / 86400) + ' 天前';
    return d.toLocaleDateString('zh-CN');
  }

  function formatDate(d) {
    if (typeof d === 'number') d = new Date(d);
    else if (typeof d === 'string') d = new Date(d);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  // 简单哈希（非安全加密，仅用于本地密码混淆）
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return 'h' + Math.abs(hash).toString(36);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // DOM 辅助
  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (k === 'dataset') Object.assign(e.dataset, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (!Array.isArray(children)) children = [children];
    children.forEach(c => {
      if (c == null) return;
      if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(String(c)));
      else e.appendChild(c);
    });
    return e;
  }

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }

  function clear(container) {
    while (container.firstChild) container.removeChild(container.firstChild);
  }

  function toast(msg, type = 'info', duration = 2000) {
    const existing = qs('.toast');
    if (existing) existing.remove();
    const t = el('div', { class: `toast toast-${type}`, html: msg });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  function confirmDialog(msg) {
    return new Promise(resolve => {
      const mask = el('div', { class: 'dialog-mask' });
      const box = el('div', { class: 'dialog-box' }, [
        el('p', { class: 'dialog-msg', html: msg }),
        el('div', { class: 'dialog-actions' }, [
          el('button', { class: 'btn btn-ghost', onclick: () => { mask.remove(); resolve(false); } }, '取消'),
          el('button', { class: 'btn btn-primary', onclick: () => { mask.remove(); resolve(true); } }, '确定')
        ])
      ]);
      mask.appendChild(box);
      document.body.appendChild(mask);
    });
  }

  // 计算连续学习天数
  function calcStreak(activity) {
    if (!activity) return 0;
    const dates = Object.keys(activity).filter(d => activity[d].tasks > 0).sort().reverse();
    if (dates.length === 0) return 0;
    let streak = 0;
    let cur = new Date();
    for (let i = 0; i < dates.length; i++) {
      const dStr = cur.toISOString().slice(0, 10);
      if (dates.includes(dStr)) {
        streak++;
        cur.setDate(cur.getDate() - 1);
      } else if (i === 0) {
        // 今天没学，从昨天开始算
        cur.setDate(cur.getDate() - 1);
        i--;
      } else {
        break;
      }
    }
    return streak;
  }

  function avatarColor(name) {
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#feb47b', '#a18cd1', '#84fab0'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  function avatar(name) {
    const ch = (name || '?').charAt(0).toUpperCase();
    return el('div', { class: 'avatar', style: `background:${avatarColor(name)}` }, ch);
  }

  return {
    uid, todayStr, formatTime, formatDate, simpleHash, validateEmail,
    el, qs, qsa, clear, toast, confirmDialog, calcStreak, avatarColor, avatar
  };
})();
