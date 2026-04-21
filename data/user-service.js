// Stores user accounts and favorites in localStorage.
// To connect a real backend later, replace getUsers/saveUsers/getSession/login/logout
// with fetch() calls to your API — the public interface stays the same.
(function () {
  const USERS_KEY = 'pc_users';
  const SESSION_KEY = 'pc_session';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Returns the logged-in username string, or null.
  function getSession() {
    return localStorage.getItem(SESSION_KEY) || null;
  }

  // Creates account if username is new, then logs in. Returns username or null.
  function login(username) {
    const name = username.trim();
    if (!name) return null;
    const users = getUsers();
    if (!users[name]) {
      users[name] = { favorites: [] };
      saveUsers(users);
    }
    localStorage.setItem(SESSION_KEY, name);
    return name;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  // Returns array of favorited medication slugs for the current user.
  function getFavorites() {
    const user = getSession();
    if (!user) return [];
    const users = getUsers();
    return (users[user] && users[user].favorites) || [];
  }

  function isFavorite(slug) {
    return getFavorites().includes(slug);
  }

  // Toggles favorite. Only one drug can be saved at a time — favoriting a new
  // one replaces the previous. Returns true if the slug is now favorited.
  function toggleFavorite(slug) {
    const user = getSession();
    if (!user) return false;
    const users = getUsers();
    if (!users[user]) users[user] = { favorites: [] };
    const favs = users[user].favorites;
    const idx = favs.indexOf(slug);
    if (idx === -1) {
      users[user].favorites = [slug]; // replace: only one allowed
    } else {
      users[user].favorites = []; // unfavorite
    }
    saveUsers(users);
    return idx === -1;
  }

  window.userService = {
    getSession,
    login,
    logout,
    getFavorites,
    isFavorite,
    toggleFavorite,
  };
})();
