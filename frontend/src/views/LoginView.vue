<template>
  <div class="auth-container container">
    <div class="auth-card glass">
      <h1>Кабинет дизайнера</h1>

      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="switchMode('login')">Вход</button>
        <button :class="{ active: mode === 'register' }" @click="switchMode('register')">Регистрация</button>
      </div>

      <form @submit.prevent="submit">
        <input
          v-if="mode === 'register'"
          v-model="name"
          type="text"
          placeholder="Имя"
          required
        />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Подождите..." : mode === "login" ? "Войти" : "Зарегистрироваться" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const auth = useAuthStore();

const mode = ref("login");
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

function switchMode(next) {
  mode.value = next;
  error.value = "";
}

async function submit() {
  error.value = "";
  loading.value = true;
  try {
    if (mode.value === "login") {
      await auth.login(email.value, password.value);
    } else {
      await auth.register(name.value, email.value, password.value);
    }
    router.push("/admin");
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  padding: 120px 20px 80px;
  display: flex;
  justify-content: center;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.auth-card h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.tabs button.active {
  color: var(--text-color);
  border-color: var(--text-color);
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

form input {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  color: var(--text-color);
  font-size: 15px;
}

.error {
  color: #ff3b30;
  font-size: 14px;
  margin: 0;
}

.btn-primary {
  color: var(--bg-color);
  padding: 12px;
  margin-top: 8px;
}
</style>
