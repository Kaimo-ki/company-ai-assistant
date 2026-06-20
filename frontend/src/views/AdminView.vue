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
        <p v-else-if="orders.length === 0" class="hint">
          Пока нет заявок. Поделитесь QR-кодом с клиентами 🎨
        </p>

        <table v-else class="data-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Помещение</th>
              <th>Площадь</th>
              <th>Бюджет</th>
              <th>Пожелания</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ formatDate(order.created_at) }}</td>
              <td>{{ order.client_name || "—" }}</td>
              <td>{{ order.client_phone || "—" }}</td>
              <td>{{ order.room_type || "—" }}</td>
              <td>{{ order.area || "—" }}</td>
              <td>{{ order.budget || "—" }}</td>
              <td class="comment-cell">{{ order.comment || "—" }}</td>
              <td><span class="status new">{{ order.status }}</span></td>
            </tr>
          </tbody>
        </table>
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

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  padding: 12px 14px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 13px;
  border-bottom: 1px solid var(--border-color);
}

.data-table td {
  padding: 14px;
  font-size: 14px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.comment-cell {
  max-width: 220px;
}

.status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
}

.status.new {
  background: rgba(0, 122, 255, 0.12);
  color: #007aff;
}

@media (max-width: 860px) {
  .panels {
    grid-template-columns: 1fr;
  }
}
</style>
