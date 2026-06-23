import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import CartView from '../views/CartView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import PromotionsView from '../views/PromotionsView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import { useAuthStore } from '../stores/auth.js'

// CRM (отдельный модуль: бэкенд на Neon, авторизация по crm_token,
// не пересекается с авторизацией дизайнера через Worker/D1)
import CrmLogin from '../views/crm/CrmLogin.vue'
import CrmLayout from '../views/crm/CrmLayout.vue'
import CrmBoard from '../views/crm/CrmBoard.vue'
import CrmClients from '../views/crm/CrmClients.vue'
import CrmArchive from '../views/crm/CrmArchive.vue'
import CrmQr from '../views/crm/CrmQr.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/promotions',
      name: 'promotions',
      component: PromotionsView
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: DeliveryView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },

    // --- CRM (Neon) ---
    { path: '/crm/login', name: 'crm-login', component: CrmLogin, meta: { crm: true } },
    {
      path: '/crm',
      component: CrmLayout,
      meta: { crm: true, requiresCrmAuth: true },
      children: [
        { path: '', name: 'crm-board', component: CrmBoard },
        { path: 'clients', name: 'crm-clients', component: CrmClients },
        { path: 'archive', name: 'crm-archive', component: CrmArchive },
        { path: 'qr', name: 'crm-qr', component: CrmQr }
      ]
    }
  ]
})

router.beforeEach((to) => {
  // CRM-маршруты — собственная авторизация по crm_token, отдельно от Worker-авторизации
  if (to.meta.crm) {
    if (to.meta.requiresCrmAuth && !localStorage.getItem('crm_token')) {
      return { path: '/crm/login' }
    }
    return
  }

  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'admin' }
  }
})

export default router
