<template>
  <div class="admin-container container">
    <div class="admin-header">
      <div>
        <h1>Кабинет дизайнера</h1>
        <p v-if="auth.designer">{{ auth.designer.name }} · {{ auth.designer.email }}</p>
      </div>
      <button class="btn logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="panels">
      <!-- QR code -->
      <div class="qr-card">
        <h2>Мой QR-код</h2>
        <p class="hint">
          Клиент сканирует код, попадает в Telegram-бота и проходит опрос.
          Заявка автоматически придёт сюда.
        </p>
        <div class="qr-box">
          <qrcode-vue :value="botLink" :size="200" level="M" />
        </div>
        <div class="link-row">
          <input :value="botLink" readonly />
          <button class="btn copy-btn" @click="copyLink">{{ copied ? "Скопировано" : "Копировать" }}</button>
        </div>
      </div>

      <!-- Orders -->
      <div class="orders-card">
        <h2>Мои заявки</h2>

        <p v-if="loading" class="hint">Загрузка...</p>
        <p v-else-if="error" class="error">{{ error }}</p>
        <div v-else-if="orders.length === 0" class="empty-state">
          <p>Пока заявок нет.</p>
          <span>Поделитесь QR-кодом с клиентами — заявки из бота появятся здесь 🎨</span>
        </div>

        <div v-else class="requests-list">
          <article v-for="order in orders" :key="order.id" class="request-card">
            <div class="request-top">
              <div>
                <span class="request-type">Заявка из бота</span>
                <h3>{{ order.client_name || "Без имени" }}</h3>
              </div>
              <span class="status">{{ statusLabel(order.status) }}</span>
            </div>

            <div class="request-grid">
              <p><b>Телефон:</b> {{ order.client_phone || "—" }}</p>
              <p><b>Дата:</b> {{ formatDate(order.created_at) }}</p>
              <p><b>Помещение:</b> {{ order.room_type || "—" }}</p>
              <p><b>Площадь:</b> {{ order.area ? order.area + " м²" : "—" }}</p>
              <p><b>Бюджет:</b> {{ order.budget || "—" }}</p>
            </div>

            <div v-if="order.comment" class="request-comment">
              <b>Пожелания:</b> {{ order.comment }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import QrcodeVue from "qrcode.vue";
import { api } from "../api.js";
import { useAuthStore } from "../stores/auth.js";
import { BOT_USERNAME } from "../config.js";

const router = useRouter();
const auth = useAuthStore();

const orders = ref([]);
const loading = ref(true);
const error = ref("");
const copied = ref(false);

const botLink = computed(() =>
  auth.designer ? `https://t.me/${BOT_USERNAME}?start=${auth.designer.id}` : ""
);

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value.replace(" ", "T") + "Z");
  return isNaN(d) ? value : d.toLocaleString("ru-RU");
}

function statusLabel(status) {
  const map = { new: "Новая", in_progress: "В работе", done: "Завершена" };
  return map[status] || status;
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(botLink.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (_) {
    /* clipboard may be blocked; ignore */
  }
}

async function logout() {
  await auth.logout();
  router.push("/login");
}

onMounted(async () => {
  try {
    const { orders: list } = await api.getOrders();
    orders.value = list;
  } catch (e) {
    error.value = e.message;
    if (/авториз|сесси/i.test(e.message)) {
      await auth.logout();
      router.push("/login");
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.admin-container {
  padding: 100px 20px 80px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.admin-header h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 6px;
}

.admin-header p {
  color: var(--text-secondary);
}

.logout-btn {
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-color);
}

.panels {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  align-items: start;
}

.qr-card,
.orders-card {
  background: var(--surface-color);
  padding: 28px;
  border-radius: var(--radius-md);
}

.qr-card h2,
.orders-card h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.hint {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
}

.qr-box {
  background: #fff;
  padding: 16px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  margin-bottom: 16px;
}

.link-row {
  display: flex;
  gap: 8px;
}

.link-row input {
  flex: 1;
  padding: 8px 10px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-color);
  color: var(--text-secondary);
}

.copy-btn {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  font-size: 13px;
  white-space: nowrap;
  color: var(--text-color);
}

.error {
  color: #ff3b30;
  font-size: 14px;
}

.empty-state {
  background: var(--bg-color);
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
  background: var(--bg-color);
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
  font-size: 20px;
  margin-top: 4px;
}

.status {
  background: var(--text-color);
  color: var(--bg-color);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.request-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
  color: var(--text-secondary);
}

.request-comment {
  margin-top: 16px;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 860px) {
  .panels {
    grid-template-columns: 1fr;
  }

  .request-grid {
    grid-template-columns: 1fr;
  }
}
</style>
