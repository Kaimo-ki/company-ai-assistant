<template>
  <div class="crm-login-wrap">
    <div class="crm-login-card">
      <h1>CRM · Центр Красок</h1>
      <p class="sub">Вход для дизайнеров</p>

      <label>Логин</label>
      <input v-model="login" type="text" placeholder="aigerim" @keyup.enter="submit" />

      <label>Пароль</label>
      <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="submit" />

      <button class="crm-btn" :disabled="loading" @click="submit">
        {{ loading ? "Входим…" : "Войти" }}
      </button>

      <p v-if="error" class="err">{{ error }}</p>
      <p class="hint">Демо: <b>aigerim</b> / <b>12345678</b></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCrmAuth } from "../../stores/crmAuth";

const login = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const auth = useCrmAuth();
const router = useRouter();

async function submit() {
  error.value = "";
  loading.value = true;
  try {
    await auth.login(login.value.trim(), password.value);
    router.push("/crm");
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.crm-login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
}
.crm-login-card {
  width: 360px;
  background: #1e293b;
  padding: 36px 32px;
  border-radius: 16px;
  color: #e2e8f0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}
h1 { font-size: 22px; margin: 0 0 4px; }
.sub { color: #94a3b8; margin: 0 0 24px; font-size: 14px; }
label { display: block; font-size: 13px; margin: 14px 0 6px; color: #cbd5e1; }
input {
  width: 100%; padding: 11px 13px; border-radius: 9px;
  border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 15px;
}
.crm-btn {
  width: 100%; margin-top: 22px; padding: 12px; border: 0; border-radius: 9px;
  background: #6366f1; color: #fff; font-weight: 600; font-size: 15px; cursor: pointer;
}
.crm-btn:disabled { opacity: 0.6; cursor: default; }
.err { color: #f87171; font-size: 13px; margin-top: 12px; }
.hint { color: #64748b; font-size: 12px; margin-top: 16px; text-align: center; }
</style>
