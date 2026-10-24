/**
 * storage.js - localStorage 数据持久化层
 * 封装用户、课程进度、社区、成就等数据的 CRUD 操作
 */
const Storage = (() => {
  const KEYS = {
    USERS: 'langlearn_users',
    SESSION: 'langlearn_session',
    PROGRESS: 'langlearn_progress',      // { userId: { courseId: { vocab: [...], grammar: score, speaking: score, listening: score } } }
    COMMUNITY: 'langlearn_community',    // posts array
    ACHIEVEMENTS: 'langlearn_achievements', // { userId: { badges: {...}, points, stats } }
    ACTIVITY: 'langlearn_activity'       // { userId: { 'YYYY-MM-DD': { duration, tasks } } }
  };

  function get(key, def = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : def;
    } catch (e) {
      console.warn('storage get error', key, e);
      return def;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('storage set error', key, e);
      return false;
    }
  }

  // ========== 用户相关 ==========
  function getUsers() {
    return get(KEYS.USERS, []);
  }

  function saveUsers(users) {
    return set(KEYS.USERS, users);
  }

  function findUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  function findUserById(id) {
    return getUsers().find(u => u.id === id);
  }

  function createUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    return user;
  }

  function updateUser(id, patch) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
    return users[idx];
  }

  function setSession(userId) {
    return set(KEYS.SESSION, { userId, loginAt: Date.now() });
  }

  function getSession() {
    return get(KEYS.SESSION, null);
  }

  function clearSession() {
    return set(KEYS.SESSION, null);
  }

  function getCurrentUser() {
    const s = getSession();
    if (!s) return null;
    return findUserById(s.userId);
  }

  // ========== 学习进度 ==========
  function getAllProgress() {
    return get(KEYS.PROGRESS, {});
  }

  function getUserProgress(userId) {
    const all = getAllProgress();
    return all[userId] || {};
  }

  function saveProgress(userId, progress) {
    const all = getAllProgress();
    all[userId] = progress;
    return set(KEYS.PROGRESS, all);
  }

  function getCourseProgress(userId, courseId) {
    const up = getUserProgress(userId);
    return up[courseId] || {
      vocab: [],            // 已掌握的单词 id 列表
      grammar: null,        // 语法得分
      speaking: null,       // 口语得分
      listening: null,      // 听力得分
      completed: false
    };
  }

  function updateCourseProgress(userId, courseId, patch) {
    const up = getUserProgress(userId);
    const cur = up[courseId] || { vocab: [], grammar: null, speaking: null, listening: null, completed: false };
    up[courseId] = { ...cur, ...patch };
    // 自动判断是否完成
    if (cur.vocab.length > 0 && cur.grammar !== null && cur.speaking !== null && cur.listening !== null) {
      up[courseId].completed = true;
    }
    saveProgress(userId, up);
    return up[courseId];
  }

  // ========== 社区 ==========
  function getPosts() {
    return get(KEYS.COMMUNITY, []);
  }

  function savePosts(posts) {
    return set(KEYS.COMMUNITY, posts);
  }

  function addPost(post) {
    const posts = getPosts();
    posts.unshift(post);
    savePosts(posts);
    return post;
  }

  function updatePost(postId, patch) {
    const posts = getPosts();
    const idx = posts.findIndex(p => p.id === postId);
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], ...patch };
    savePosts(posts);
    return posts[idx];
  }

  // ========== 成就与积分 ==========
  function getUserAchievements(userId) {
    const all = get(KEYS.ACHIEVEMENTS, {});
    if (!all[userId]) {
      all[userId] = { points: 0, badges: {}, stats: { coursesCompleted: 0, wordsMastered: 0, streak: 0, lastActive: null } };
    }
    return all[userId];
  }

  function saveUserAchievements(userId, ach) {
    const all = get(KEYS.ACHIEVEMENTS, {});
    all[userId] = ach;
    return set(KEYS.ACHIEVEMENTS, all);
  }

  function addPoints(userId, pts) {
    const ach = getUserAchievements(userId);
    ach.points += pts;
    saveUserAchievements(userId, ach);
    return ach.points;
  }

  function unlockBadge(userId, badgeId) {
    const ach = getUserAchievements(userId);
    if (ach.badges[badgeId]) return false;
    ach.badges[badgeId] = { unlockedAt: Date.now() };
    saveUserAchievements(userId, ach);
    return true;
  }

  // ========== 学习活动记录 ==========
  function getUserActivity(userId) {
    const all = get(KEYS.ACTIVITY, {});
    return all[userId] || {};
  }

  function recordActivity(userId, dateStr, data) {
    const all = get(KEYS.ACTIVITY, {});
    if (!all[userId]) all[userId] = {};
    const cur = all[userId][dateStr] || { duration: 0, tasks: 0 };
    all[userId][dateStr] = {
      duration: cur.duration + (data.duration || 0),
      tasks: cur.tasks + (data.tasks || 0)
    };
    return set(KEYS.ACTIVITY, all);
  }

  // ========== 排行榜 ==========
  function getLeaderboard() {
    const all = get(KEYS.ACHIEVEMENTS, {});
    const users = getUsers();
    const board = users.map(u => {
      const ach = all[u.id] || { points: 0, badges: {} };
      return {
        userId: u.id,
        name: u.name || u.email,
        avatar: u.avatar || '',
        points: ach.points || 0,
        badges: Object.keys(ach.badges || {}).length
      };
    });
    board.sort((a, b) => b.points - a.points);
    return board;
  }

  return {
    KEYS,
    get, set,
    getUsers, findUserByEmail, findUserById, createUser, updateUser,
    setSession, getSession, clearSession, getCurrentUser,
    getUserProgress, saveProgress, getCourseProgress, updateCourseProgress,
    getPosts, addPost, updatePost,
    getUserAchievements, saveUserAchievements, addPoints, unlockBadge,
    getUserActivity, recordActivity,
    getLeaderboard
  };
})();
