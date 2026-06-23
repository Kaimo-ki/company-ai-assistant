<template>
  <div>
    <h1>Архив</h1>
    <p class="sub">Архивные заказы. Их можно вернуть на доску кнопкой «Восстановить».</p>

    <div v-if="error" class="err">{{ error }}</div>
    <div v-if="list.length === 0" class="empty">В архиве пока пусто.</div>

    <div class="list">
      <div v-for="o in list" :key="o.id" class="row">
        <div class="info">
          <div class="title">{{ o.title }}</div>
          <div v-if="o.client" class="client">👤 {{ o.client.full_name }}<span v-if="o.client.phone"> · {{ o.client.phone }}</span></div>
          <div v-if="o.details" class="details">{{ o.details }}</div>
        </div>
        <button class="restore" @click="restore(o.id)">↩ Восстановить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { crmApi } from "../../crm/api";

const list = ref([]);
const error = ref("");

async function load() {
  try {
    list.value = await crmApi.getArchive();
    error.value = "";
  } catch (e) {
    error.value = e.message;
  }
}

async function restore(id) {
  try {
    await crmApi.setStatus(id, "done"); // возвращаем на доску в колонку «Готово»
    await load();
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
.list { display: flex; flex-direction: column; gap: 10px; max-width: 680px; }
.row {
  background: #fff; border-radius: 10px; padding: 14px 18px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.title { font-weight: 600; color: #0f172a; }
.client { font-size: 13px; color: #475569; margin-top: 2px; }
.details { font-size: 13px; color: #64748b; margin-top: 2px; }
.restore {
  flex-shrink: 0; padding: 8px 14px; border: 1px solid #6366f1; background: #eef2ff;
  color: #4f46e5; border-radius: 7px; cursor: pointer; font-size: 13px; font-weight: 600;
}
.restore:hover { background: #6366f1; color: #fff; }
</style>
