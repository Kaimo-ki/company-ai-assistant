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
        <router-link to="/promotions" class="nav-link" active-class="active">Акции</router-link>
        <router-link to="/delivery" class="nav-link" active-class="active">Доставка</router-link>
        <router-link to="/chat" class="nav-link" active-class="active">ИИ-помощник</router-link>
      </div>

      <div class="nav-actions">
        <router-link to="/cart" class="icon-btn" aria-label="Корзина">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </router-link>

        <router-link
          :to="auth.isAuthenticated ? '/admin' : '/login'"
          class="nav-link cabinet-link"
          active-class="active"
        >
          {{ auth.isAuthenticated ? 'Кабинет' : 'Для дизайнеров' }}
        </router-link>

        <router-link to="/profile" class="btn btn-primary btn-sm profile-btn">
          Профиль
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid var(--border-color);
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
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
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

.cabinet-link {
  white-space: nowrap;
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

.profile-btn {
  color: var(--bg-color);
  text-decoration: none;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

@media (max-width: 900px) {
  .nav-links {
    gap: 12px;
  }

  .nav-link {
    font-size: 13px;
  }
}

@media (max-width: 760px) {
  .nav-links {
    display: none;
  }

  .logo span {
    font-size: 16px;
  }
}
</style>
