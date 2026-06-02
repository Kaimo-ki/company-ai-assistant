<template>
  <div class="profile-container container">
    <div class="profile-sidebar">
      <h2>Профиль</h2>
      <ul class="nav-list">
        <li class="active">Данные клиента</li>
        <li>История заявок</li>
        <li>Настройки</li>
      </ul>
    </div>

    <div class="profile-content">
      <div class="content-section">
        <h1>Данные клиента</h1>
        <p class="hint">
          Укажите данные, чтобы менеджер Центра Красок мог связаться с вами по заявке.
        </p>

        <form class="auth-form" @submit.prevent>
          <div class="form-group">
            <label>Полное имя</label>
            <input type="text" placeholder="Введите имя" />
          </div>

          <div class="form-group">
            <label>Номер телефона</label>
            <input type="tel" placeholder="+7 ___ ___ __ __" />
          </div>

          <button class="btn btn-primary mt-4">Сохранить данные</button>
        </form>
      </div>

      <div class="content-section mt-8">
        <h2>История заявок</h2>
        <div class="empty-state">
          <p>Пока заявок нет.</p>
          <span>После оформления заявки она появится здесь.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 80px 20px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 60px;
}

@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
}

.profile-sidebar h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-list li {
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.nav-list li:hover {
  background: var(--surface-color);
  color: var(--text-color);
}

.nav-list li.active {
  background: var(--surface-color);
  color: var(--text-color);
  font-weight: 500;
}

.profile-content h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
}

.hint {
  color: var(--text-secondary);
  max-width: 520px;
  margin-bottom: 28px;
  line-height: 1.5;
}

.content-section h2 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}

.auth-form {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group input {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 15px;
}

.mt-4 {
  margin-top: 16px;
}

.mt-8 {
  margin-top: 64px;
}

.empty-state {
  background: var(--surface-color);
  border-radius: var(--radius-md);
  padding: 24px;
  color: var(--text-secondary);
}

.empty-state p {
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 6px;
}
</style>