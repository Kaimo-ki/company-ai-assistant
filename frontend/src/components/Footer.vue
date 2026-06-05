<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <router-link to="/" class="footer-logo">Центр Красок AI</router-link>
        <p class="footer-text">
          Демонстрационный MVP для подбора красок, оформления заявок, просмотра акций и филиалов в Алматы.
        </p>
      </div>

      <div>
        <h3>Навигация</h3>
        <router-link to="/">Каталог</router-link>
        <router-link to="/promotions">Акции</router-link>
        <router-link to="/delivery">Доставка</router-link>
        <router-link to="/profile">Личный кабинет</router-link>
      </div>

      <div>
        <h3>Контакты</h3>
        <p>+7 (777) 292-84-01</p>
        <p>info@centr-krasok.kz</p>
        <p>Instagram: @centr_krasok</p>
      </div>

      <div>
        <h3>Адрес</h3>
        <p>Алматы, ул. Кабдолова 1/8</p>
        <p>ТК ARMADA, блок 1, линия D</p>
        <p>Бутики 14 и 21</p>
        <p>Пн–Вс: 10:00–20:00</p>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 Центр Красок AI. Макет для презентации проекта.</span>
      <span>Made for MVP demonstration</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-color);
  background: var(--surface-color);
  padding: 48px 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 32px;
}

.footer-logo {
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
}

.footer-text {
  color: var(--text-secondary);
  max-width: 360px;
}

.footer h3 {
  font-size: 15px;
  margin-bottom: 14px;
}

.footer a,
.footer p {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-size: 14px;
}

.footer a:hover {
  color: var(--text-color);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 34px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13px;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom {
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
