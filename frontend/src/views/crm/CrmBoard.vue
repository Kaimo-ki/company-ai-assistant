<template>
  <div>
    <div class="head">
      <h1>Доска заказов</h1>
      <span class="auto">обновляется автоматически</span>
    </div>

    <div v-if="error" class="err">{{ error }}</div>

    <div class="board">
      <div
        v-for="col in columns"
        :key="col.key"
        class="column"
        @dragover.prevent
        @drop="onDrop(col.key)"
      >
        <div class="col-head">
          <span :class="['dot', col.key]"></span>
          {{ col.title }}
          <span class="count">{{ board[col.key].length }}</span>
        </div>

        <div v-if="board[col.key].length === 0" class="empty">Пусто</div>

        <div
          v-for="card in board[col.key]"
          :key="card.id"
          class="card"
          draggable="true"
          @dragstart="dragId = card.id"
        >
          <div class="card-title">{{ card.title }}</div>
          <div v-if="card.client" class="client">
            👤 {{ card.client.full_name }}
            <span v-if="card.client.phone"> · {{ card.client.phone }}</span>
          </div>
          <div v-if="card.details" class="details">{{ card.details }}</div>
          <a v-if="card.reference_url" :href="card.reference_url" target="_blank" class="ref">🔗 референс</a>

          <div class="moves">
            <button v-if="col.key !== 'new'" @click="move(card.id, prevOf(col.key))">←</button>
            <button v-if="col.key !== 'done'" @click="move(card.id, nextOf(col.key))">→</button>
          </div>
          <button class="archive-btn" @click="archive(card.id)">📦 В архив</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { crmApi } from "../../crm/api";

const columns = [
  { key: "new", title: "Новые" },
  { key: "in_progress", title: "В работе" },
  { key: "done", title: "Готово" },
];
const order = ["new", "in_progress", "done"];
const board = ref({ new: [], in_progress: [], done: [] });
const error = ref("");
const dragId = ref(null);
let timer = null;

const nextOf = (k) => order[Math.min(order.indexOf(k) + 1, 2)];
const prevOf = (k) => order[Math.max(order.indexOf(k) - 1, 0)];

async function load() {
  try {
    board.value = await crmApi.getBoard();
    error.value = "";
  } catch (e) {
    error.value = e.message;
  }
}

async function move(id, status) {
  try {
    await crmApi.setStatus(id, status);
    await load();
  } catch (e) {
    error.value = e.message;
  }
}

async function archive(id) {
  try {
    await crmApi.setStatus(id, "archived"); // статус меняется -> карточка уходит с доски в Архив
    await load();
  } catch (e) {
    error.value = e.message;
  }
}

function onDrop(colKey) {
  if (dragId.value != null) {
    move(dragId.value, colKey);
    dragId.value = null;
  }
}

onMounted(() => {
  load();
  timer = setInterval(load, 7000); // «моментальное уведомление»: новые карточки появляются сами
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
h1 { font-size: 24px; margin: 0; color: #0f172a; }
.auto { font-size: 12px; color: #94a3b8; }
.err { color: #dc2626; margin-bottom: 14px; }
.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; min-width: 760px; }
.column { background: #e2e8f0; border-radius: 12px; padding: 14px; min-height: 200px; }
.col-head {
  display: flex; align-items: center; gap: 8px; font-weight: 600;
  color: #334155; margin-bottom: 12px; font-size: 14px;
}
.dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.dot.new { background: #3b82f6; }
.dot.in_progress { background: #f59e0b; }
.dot.done { background: #22c55e; }
.count { margin-left: auto; background: #cbd5e1; border-radius: 20px; padding: 1px 9px; font-size: 12px; }
.empty { color: #94a3b8; font-size: 13px; text-align: center; padding: 16px 0; }
.card {
  background: #fff; border-radius: 10px; padding: 12px; margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08); cursor: grab;
}
.card-title { font-weight: 600; color: #0f172a; font-size: 14px; margin-bottom: 6px; }
.client { font-size: 12px; color: #475569; margin-bottom: 4px; }
.details { font-size: 12px; color: #64748b; margin-bottom: 6px; }
.ref { font-size: 12px; color: #6366f1; text-decoration: none; }
.moves { display: flex; gap: 6px; margin-top: 8px; }
.moves button {
  flex: 1; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px;
  padding: 4px; cursor: pointer; font-size: 13px;
}
.moves button:hover { background: #6366f1; color: #fff; border-color: #6366f1; }
.archive-btn {
  width: 100%; margin-top: 6px; border: 1px dashed #cbd5e1; background: transparent;
  border-radius: 6px; padding: 4px; cursor: pointer; font-size: 12px; color: #64748b;
}
.archive-btn:hover { background: #f1f5f9; color: #334155; }
</style>
