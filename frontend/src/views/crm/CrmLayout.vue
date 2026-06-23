<template>
  <div class="crm-shell">
    <aside class="crm-side">
      <div class="brand">🎨 Центр Красок<br /><span>CRM</span></div>
      <nav>
        <router-link to="/crm" class="side-link" exact-active-class="active">📋 Доска заказов</router-link>
        <router-link to="/crm/clients" class="side-link" active-class="active">👥 Мои клиенты</router-link>
        <router-link to="/crm/archive" class="side-link" active-class="active">📦 Архив</router-link>
      </nav>
      <div class="who">
        <div class="name">{{ auth.designer?.full_name }}</div>
        <button class="logout" @click="logout">Выйти</button>
      </div>
    </aside>
    <main class="crm-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCrmAuth } from "../../stores/crmAuth";
const auth = useCrmAuth();
const router = useRouter();
function logout() {
  auth.logout();
  router.push("/crm/login");
}
</script>

<style scoped>
.crm-shell { display: flex; min-height: 100vh; background: #f1f5f9; }
.crm-side {
  width: 230px; background: #0f172a; color: #e2e8f0;
  display: flex; flex-direction: column; padding: 24px 16px;
}
.brand { font-weight: 700; font-size: 18px; line-height: 1.3; margin-bottom: 32px; }
.brand span { color: #818cf8; font-size: 13px; }
nav { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.side-link {
  color: #cbd5e1; text-decoration: none; padding: 10px 12px;
  border-radius: 8px; font-size: 14px;
}
.side-link:hover { background: #1e293b; }
.side-link.active { background: #6366f1; color: #fff; }
.who { border-top: 1px solid #1e293b; padding-top: 16px; }
.name { font-size: 14px; margin-bottom: 8px; }
.logout {
  width: 100%; padding: 8px; border: 1px solid #334155; background: transparent;
  color: #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 13px;
}
.logout:hover { background: #1e293b; }
.crm-main { flex: 1; padding: 28px 32px; overflow-x: auto; }
</style>
