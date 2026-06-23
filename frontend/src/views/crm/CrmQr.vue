<template>
  <div>
    <div class="head">
      <h1>Мой QR-код</h1>
      <span class="auto">для привлечения клиентов</span>
    </div>

    <div class="qr-card">
      <p class="hint">
        Клиент сканирует код, попадает в Telegram-бота и проходит опрос.
        Заявка автоматически придёт в вашу доску заказов.
      </p>

      <template v-if="botLink">
        <div class="qr-box">
          <qrcode-vue :value="botLink" :size="220" level="M" />
        </div>
        <div class="link-row">
          <input :value="botLink" readonly />
          <button class="copy-btn" @click="copyLink">
            {{ copied ? "Скопировано" : "Копировать" }}
          </button>
        </div>
      </template>

      <p v-else class="err">
        Не удалось определить код дизайнера. Попробуйте перезайти в систему.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import { useCrmAuth } from "../../stores/crmAuth";
import { BOT_USERNAME } from "../../config";

const auth = useCrmAuth();
const copied = ref(false);

// Уникальная ссылка дизайнера: бот по ?start=<code> привяжет клиента к нему.
const botLink = computed(() =>
  auth.designer?.code
    ? `https://t.me/${BOT_USERNAME}?start=${auth.designer.code}`
    : ""
);

async function copyLink() {
  try {
    await navigator.clipboard.writeText(botLink.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (_) {
    /* буфер обмена может быть заблокирован — игнорируем */
  }
}
</script>

<style scoped>
.head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px; }
.head h1 { font-size: 24px; font-weight: 700; color: #0f172a; }
.auto { color: #64748b; font-size: 13px; }

.qr-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 28px; max-width: 420px;
}
.hint { color: #64748b; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }

.qr-box {
  background: #fff; padding: 16px; border: 1px solid #e2e8f0;
  border-radius: 10px; display: inline-flex; margin-bottom: 20px;
}

.link-row { display: flex; gap: 8px; }
.link-row input {
  flex: 1; padding: 9px 11px; font-size: 12px; color: #475569;
  border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;
}
.copy-btn {
  border: 1px solid #6366f1; background: #6366f1; color: #fff;
  padding: 9px 14px; font-size: 13px; border-radius: 8px;
  cursor: pointer; white-space: nowrap;
}
.copy-btn:hover { background: #4f46e5; }

.err { color: #ef4444; font-size: 14px; }
</style>
