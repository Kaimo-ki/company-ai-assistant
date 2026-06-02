<template>
  <nav class="navbar glass">
    <div class="container navbar-content">
      <router-link to="/" class="logo">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
        <span>Центр Красок AI</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">Каталог</router-link>
        <router-link to="/chat" class="nav-link" active-class="active">ИИ-помощник</router-link>
      </div>

      <div class="nav-actions">
        <router-link to="/cart" class="icon-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </router-link>

        <router-link to="/profile" class="btn btn-primary btn-sm" style="color: white; text-decoration: none;">
          Профиль
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-color);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-btn {
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.icon-btn:hover {
  transform: scale(1.1);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>