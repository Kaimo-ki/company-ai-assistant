<template>
  <div>
    <h1>Мои клиенты</h1>
    <p class="sub">Здесь можно вручную задать персональную скидку клиенту.</p>

    <div v-if="error" class="err">{{ error }}</div>
    <div v-if="clients.length === 0" class="empty">Пока нет клиентов.</div>

    <div class="list">
      <div v-for="c in clients" :key="c.id" class="row">
        <div class="info">
          <div class="name">{{ c.full_name }}</div>
          <div class="phone">{{ c.phone || "—" }}</div>
        </div>
        <div class="discount">
          <input type="number" min="0" max="100" v-model.number="c.personal_discount" />
          <span>%</span>
          <button @click="save(c)">{{ savedId === c.id ? "✓ Сохранено" : "Сохранить" }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { crmApi } from "../../crm/api";

const clients = ref([]);
const error = ref("");
const savedId = ref(null);

async function load() {
  try {
    clients.value = await crmApi.getClients();
  } catch (e) {
    error.value = e.message;
  }
}

async function save(c) {
  try {
    await crmApi.setDiscount(c.id, c.personal_discount);
    savedId.value = c.id;
    setTimeout(() => (savedId.value = null), 1500);
  } catch (e) {
    error.value = e.message;
  }
}

onMounted(load);
</script>

<style scoped>
h1 { font-size: 24px; margin: 0 0 4px; color: #0f172a; }
.sub { color: #64748b; font-size: 14px; margin: 0 0 22px; }
.err { color: #dc2626; margin-bottom: 14px; }
.empty { color: #94a3b8; }
.list { display: flex; flex-direction: column; gap: 10px; max-width: 620px; }
.row {
  background: #fff; border-radius: 10px; padding: 14px 18px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.name { font-weight: 600; color: #0f172a; }
.phone { font-size: 13px; color: #64748b; }
.discount { display: flex; align-items: center; gap: 8px; }
.discount input {
  width: 70px; padding: 7px 9px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 14px;
}
.discount button {
  padding: 7px 14px; border: 0; border-radius: 7px; background: #6366f1;
  color: #fff; cursor: pointer; font-size: 13px; font-weight: 600;
}
.discount button:hover { background: #4f46e5; }
</style>
