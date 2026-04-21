// Handles login/register modal and the user section in the page header.
// Communicates with other scripts via two custom DOM events:
//   'user-changed'      — fired after login or logout
//   'toggle-favorites'  — fired when the user clicks "♥ N saved"
(function () {
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Auth modal ────────────────────────────────────────────────────────────

  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.className = 'auth-modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'auth-modal-title');
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="auth-modal-box">
      <h2 id="auth-modal-title" class="auth-modal-title">Save to favorites</h2>
      <p class="auth-modal-subtitle">Enter a username to get started — no password needed.</p>
      <input id="auth-username-input" class="auth-input" type="text"
             placeholder="Choose a username" autocomplete="username" maxlength="40" />
      <p id="auth-error" class="auth-error" aria-live="polite"></p>
      <button id="auth-submit-btn" class="auth-submit-btn" type="button">Continue</button>
      <button id="auth-cancel-btn" class="auth-cancel-btn" type="button">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  let pendingCallback = null;

  function showLoginModal(onSuccess) {
    pendingCallback = onSuccess || null;
    document.getElementById('auth-username-input').value = '';
    document.getElementById('auth-error').textContent = '';
    modal.style.display = 'flex';
    setTimeout(() => document.getElementById('auth-username-input').focus(), 50);
  }

  function hideModal() {
    modal.style.display = 'none';
    pendingCallback = null;
  }

  document.getElementById('auth-submit-btn').addEventListener('click', () => {
    const input = document.getElementById('auth-username-input');
    const errorEl = document.getElementById('auth-error');
    const username = input.value.trim();
    if (!username) {
      errorEl.textContent = 'Please enter a username.';
      return;
    }
    const loggedIn = window.userService.login(username);
    if (loggedIn) {
      hideModal();
      updateHeader();
      const cb = pendingCallback;
      pendingCallback = null;
      if (cb) cb();
    }
  });

  document.getElementById('auth-username-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('auth-submit-btn').click();
  });

  document.getElementById('auth-cancel-btn').addEventListener('click', hideModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // ── Header user nav ───────────────────────────────────────────────────────

  function updateHeader() {
    const nav = document.getElementById('user-nav');
    if (!nav) return;
    const user = window.userService.getSession();

    if (user) {
      const favCount = window.userService.getFavorites().length;
      const label = favCount === 1 ? '1 saved' : `${favCount} saved`;
      nav.innerHTML = `
        <span class="user-nav-name">Hi, ${escapeHtml(user)}</span>
        <button id="fav-toggle-btn" class="user-nav-favbtn" type="button"
                title="Show your saved favorites">♥ ${label}</button>
        <button id="logout-btn" class="user-nav-logout" type="button">Log out</button>
      `;
      document.getElementById('fav-toggle-btn').addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-favorites'));
      });
      document.getElementById('logout-btn').addEventListener('click', () => {
        window.userService.logout();
        updateHeader();
        document.dispatchEvent(new CustomEvent('user-changed'));
      });
    } else {
      nav.innerHTML = `
        <button id="login-nav-btn" class="user-nav-login" type="button">Sign in</button>
      `;
      document.getElementById('login-nav-btn').addEventListener('click', () => {
        showLoginModal(() => {
          updateHeader();
          document.dispatchEvent(new CustomEvent('user-changed'));
        });
      });
    }
  }

  updateHeader();

  window.authUI = { showLoginModal, updateHeader };
})();
