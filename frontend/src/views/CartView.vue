<template>
  <div class="cart-container container">
    <h1 class="page-title">Корзина</h1>

    <div v-if="cart.items.length === 0" class="empty-state">
      <p>Корзина пустая.</p>
      <router-link to="/" class="btn btn-outline mt-4">Вернуться в каталог</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <article v-for="item in cart.items" :key="item.product.id" class="cart-item">
          <div class="item-color" :style="{ backgroundColor: item.product.hex_code }"></div>

          <div class="item-details">
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.brand }} • {{ item.product.volume }}</p>
            <span>{{ formatPrice(item.product.price) }}</span>
          </div>

          <div class="item-actions">
            <select :value="item.quantity" @change="event => cart.updateQuantity(item.product.id, Number(event.target.value))">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
            <button class="remove-btn" @click="cart.removeItem(item.product.id)">Удалить</button>
          </div>
        </article>
      </div>

      <aside class="cart-summary">
        <h2>Итог заявки</h2>

        <div class="summary-row">
          <span>Товары</span>
          <span>{{ cart.totalItems }}</span>
        </div>

        <div class="summary-row">
          <span>Сумма</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>

        <div class="summary-row promo-row">
          <input type="text" placeholder="Промокод: START10 или SALE20" v-model.trim="promoCode" />
          <button class="btn btn-outline btn-sm" @click="applyPromo">OK</button>
        </div>

        <div v-if="cart.discountPercent > 0" class="summary-row discount">
          <span>Скидка {{ cart.discountPercent }}%</span>
          <span>-{{ formatPrice(cart.subtotal * cart.discountPercent / 100) }}</span>
        </div>

        <div class="summary-row total">
          <span>К оплате</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>

        <button class="btn btn-primary btn-full checkout-btn" @click="createOrderRequest">
          Оформить заявку
        </button>

        <p class="small-note">
          Для демо заявка сохранится в истории личного кабинета.
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const router = useRouter()
const promoCode = ref('')

function formatPrice(value) {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(Number(value || 0))
}

function applyPromo() {
  const code = promoCode.value.toUpperCase()

  if (code === 'START10') {
    cart.applyDiscount(10)
  } else if (code === 'SALE20') {
    cart.applyDiscount(20)
  } else {
    window.alert('Промокод не найден. Для демо используйте START10 или SALE20.')
  }
}

function createOrderRequest() {
  let profile = {}

  try {
    profile = JSON.parse(window.localStorage.getItem('paintCustomerProfile') || '{}')
  } catch {
    profile = {}
  }

  if (!profile.name || !profile.phone) {
    window.alert('Сначала сохраните имя и телефон в личном кабинете.')
    router.push('/profile')
    return
  }

  const request = {
    id: Date.now(),
    type: 'Заявка из корзины',
    status: 'Новая',
    name: profile.name,
    phone: profile.phone,
    date: new Date().toLocaleString('ru-RU'),
    total: cart.total,
    items: cart.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity
    })),
    comment: 'Клиент оформил заявку из корзины на сайте.'
  }

  const saved = JSON.parse(window.localStorage.getItem('paintRequests') || '[]')
  window.localStorage.setItem('paintRequests', JSON.stringify([request, ...saved]))

  cart.clearCart()
  router.push('/profile')
}
</script>

<style scoped>
.cart-container {
  padding: 80px 20px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 48px;
  text-align: center;
  letter-spacing: -0.8px;
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
  padding: 60px 0;
}

.mt-4 {
  margin-top: 16px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

.cart-item {
  display: flex;
  padding: 28px 0;
  border-bottom: 1px solid var(--border-color);
  gap: 22px;
}

.cart-item:first-child {
  padding-top: 0;
}

.item-color {
  width: 110px;
  height: 110px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  font-size: 20px;
  font-weight: 650;
  margin-bottom: 8px;
}

.item-details p {
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.item-details span {
  font-weight: 700;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.item-actions select {
  padding: 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
}

.remove-btn {
  color: #ff3b30;
  font-size: 14px;
}

.cart-summary {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 32px;
  border-radius: var(--radius-md);
}

.cart-summary h2 {
  font-size: 24px;
  font-weight: 650;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
  font-size: 15px;
}

.promo-row {
  align-items: center;
}

.promo-row input {
  flex-grow: 1;
  min-width: 0;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
}

.discount {
  color: #22a06b;
}

.total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.checkout-btn {
  width: 100%;
  margin-top: 28px;
  padding: 16px;
  font-size: 16px;
}

.small-note {
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 13px;
  text-align: center;
}

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
  }

  .item-actions {
    align-items: flex-start;
  }
}
</style>
