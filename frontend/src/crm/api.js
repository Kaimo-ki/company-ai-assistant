// Доступ фронтенда к бэкенду CRM (Node/Express на Render).
// Базовый адрес бэкенда: локально — localhost:3000, в проде — VITE_API_BASE.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

function authHeaders() {
  const token = localStorage.getItem("crm_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req(path, options = {}) {
  const res = await fetch(`${API_BASE}/api/crm${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Ошибка ${res.status}`);
  return data;
}

export const crmApi = {
  login: (login, password) =>
    req("/auth/login", { method: "POST", body: JSON.stringify({ login, password }) }),
  getBoard: () => req("/orders"),
  getArchive: () => req("/orders/archive"),
  setStatus: (id, status) =>
    req(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  getClients: () => req("/clients"),
  setDiscount: (id, discount) =>
    req(`/clients/${id}/discount`, { method: "PATCH", body: JSON.stringify({ discount }) }),

  // Публичная заявка с сайта. Уходит в тот же бэкенд (эндпоинт интеграции),
  // закрепляется за дизайнером aigerim и появляется у неё в CRM
  // (доска «Новые» + раздел «Мои клиенты»).
  submitRequest: ({ full_name, phone, comment }) =>
    req("/orders", {
      method: "POST",
      body: JSON.stringify({
        designer_code: "aigerim",
        client: { full_name, phone },
        title: "Заявка с сайта",
        details: comment || "Клиент оставил контактные данные на сайте.",
      }),
    }),
};
