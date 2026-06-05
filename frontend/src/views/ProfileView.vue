<template>
  <div class="profile-container container">
    <aside class="profile-sidebar">
      <h2>Личный кабинет</h2>
      <ul class="nav-list">
        <li :class="{ active: activeTab === 'data' }" @click="activeTab = 'data'">Данные клиента</li>
        <li :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'">История заявок</li>
        <li :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">Настройки</li>
      </ul>
    </aside>

    <section class="profile-content">
      <div v-if="activeTab === 'data'" class="content-section">
        <h1>Данные клиента</h1>
        <p class="hint">
          Укажите имя и телефон. После сохранения сайт создаст демо-заявку, чтобы менеджер мог связаться с клиентом.
        </p>

        <form class="auth-form" @submit.prevent="saveProfile">
          <div class="form-group">
            <label>Полное имя</label>
            <input v-model.trim="form.name" type="text" placeholder="Введите имя" autocomplete="name" />
          </div>

          <div class="form-group">
            <label>Номер телефона</label>
            <input v-model.trim="form.phone" type="tel" placeholder="+7 ___ ___ __ __" autocomplete="tel" />
          </div>

          <button class="btn btn-primary mt-4">Сохранить данные</button>

          <p v-if="notice" class="notice">{{ notice }}</p>
        </form>
      </div>

      <div v-if="activeTab === 'history'" class="content-section">
        <div class="history-header">
          <div>
            <h1>История заявок</h1>
            <p class="hint">
              Для MVP заявки сохраняются в localStorage браузера. Позже это можно заменить на Supabase, Firebase или backend.
            </p>
          </div>

          <button v-if="requests.length" class="btn btn-outline" @click="clearRequests">
            Очистить
          </button>
        </div>

        <div v-if="requests.length === 0" class="empty-state">
          <p>Пока заявок нет.</p>
          <span>После сохранения данных или оформления корзины заявка появится здесь.</span>
        </div>

        <div v-else class="requests-list">
          <article v-for="request in requests" :key="request.id" class="request-card">
            <div class="request-top">
              <div>
                <span class="request-type">{{ request.type }}</span>
                <h3>{{ request.name }}</h3>
              </div>
              <span class="status">{{ request.status }}</span>
            </div>

            <div class="request-grid">
              <p><b>Телефон:</b> {{ request.phone }}</p>
              <p><b>Дата:</b> {{ request.date }}</p>
              <p v-if="request.total"><b>Сумма:</b> {{ formatPrice(request.total) }}</p>
              <p v-if="request.comment"><b>Комментарий:</b> {{ request.comment }}</p>
            </div>

            <div v-if="request.items?.length" class="items">
              <b>Товары:</b>
              <ul>
                <li v-for="item in request.items" :key="item.id">
                  {{ item.name }} × {{ item.quantity }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <div v-if="activeTab === 'settings'" class="content-section">
        <h1>Настройки</h1>
        <div class="empty-state">
          <p>Раздел подготовлен для будущего развития.</p>
          <span>Здесь можно будет добавить язык, уведомления, город и предпочтения клиента.</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const activeTab = ref('data')
const notice = ref('')
const requests = ref([])

const form = reactive({
  name: '',
  phone: ''
})

onMounted(() => {
  loadProfile()
  loadRequests()
})

function loadProfile() {
  try {
    const saved = window.localStorage.getItem('paintCustomerProfile')
    if (!saved) return

    const profile = JSON.parse(saved)
    form.name = profile.name || ''
    form.phone = profile.phone || ''
  } catch {
    form.name = ''
    form.phone = ''
  }
}

function loadRequests() {
  try {
    const saved = window.localStorage.getItem('paintRequests')
    requests.value = saved ? JSON.parse(saved) : []
  } catch {
    requests.value = []
  }
}

function saveRequests() {
  window.localStorage.setItem('paintRequests', JSON.stringify(requests.value))
}

function saveProfile() {
  if (!form.name || !form.phone) {
    notice.value = 'Заполните имя и номер телефона.'
    return
  }

  const profile = {
    name: form.name,
    phone: form.phone,
    updatedAt: new Date().toISOString()
  }

  window.localStorage.setItem('paintCustomerProfile', JSON.stringify(profile))

  const request = {
    id: Date.now(),
    type: 'Обратный звонок',
    status: 'Новая',
    name: form.name,
    phone: form.phone,
    date: new Date().toLocaleString('ru-RU'),
    comment: 'Клиент оставил контактные данные в личном кабинете.'
  }

  requests.value = [request, ...requests.value]
  saveRequests()

  notice.value = 'Данные сохранены. Заявка добавлена в историю.'
  activeTab.value = 'history'
}

function clearRequests() {
  requests.value = []
  saveRequests()
}

function formatPrice(value) {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(Number(value || 0))
}
</script>

<style scoped>
.profile-container {
  padding: 80px 20px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 60px;
}

.profile-sidebar h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-list li {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.nav-list li:hover,
.nav-list li.active {
  background: var(--surface-color);
  color: var(--text-color);
  font-weight: 600;
}

.profile-content h1 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.7px;
}

.hint {
  color: var(--text-secondary);
  max-width: 680px;
  margin-bottom: 28px;
  line-height: 1.5;
}

.auth-form {
  max-width: 560px;
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
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 15px;
}

.mt-4 {
  margin-top: 16px;
}

.notice {
  color: var(--text-color);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 12px 14px;
  border-radius: var(--radius-sm);
}

.history-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
}

.empty-state {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px;
  color: var(--text-secondary);
}

.empty-state p {
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 6px;
}

.requests-list {
  display: grid;
  gap: 16px;
}

.request-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 22px;
}

.request-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.request-type {
  color: var(--text-secondary);
  font-size: 13px;
}

.request-card h3 {
  font-size: 22px;
  margin-top: 4px;
}

.status {
  background: var(--text-color);
  color: var(--bg-color);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
}

.request-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
  color: var(--text-secondary);
}

.items {
  margin-top: 16px;
  color: var(--text-secondary);
}

.items ul {
  margin-top: 8px;
  padding-left: 18px;
}

@media (max-width: 800px) {
  .profile-container {
    grid-template-columns: 1fr;
  }

  .history-header {
    flex-direction: column;
  }

  .request-grid {
    grid-template-columns: 1fr;
  }
}
</style>
