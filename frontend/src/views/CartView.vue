<template>
  <div class="cart-container container">
    <h1 class="page-title">Your Bag</h1>
    
    <div v-if="cart.items.length === 0" class="empty-state">
      <p>Your bag is empty.</p>
      <router-link to="/" class="btn btn-outline mt-4">Continue Shopping</router-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.product.id" class="cart-item">
          <div class="item-color" :style="{ backgroundColor: item.product.hex_code }"></div>
          <div class="item-details">
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.price }} ₽</p>
          </div>
          <div class="item-actions">
            <select :value="item.quantity" @change="e => cart.updateQuantity(item.product.id, parseInt(e.target.value))">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
            <button class="remove-btn" @click="cart.removeItem(item.product.id)">Remove</button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ cart.subtotal }} ₽</span>
        </div>
        <div class="summary-row promo-row">
          <input type="text" placeholder="Promo code (e.g., START10)" v-model="promoCode" />
          <button class="btn btn-outline btn-sm" @click="applyPromo">Apply</button>
        </div>
        <div v-if="cart.discountPercent > 0" class="summary-row discount">
          <span>Discount ({{ cart.discountPercent }}%)</span>
          <span>-{{ (cart.subtotal * cart.discountPercent / 100).toFixed(2) }} ₽</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>{{ cart.total.toFixed(2) }} ₽</span>
        </div>
        <button class="btn btn-primary btn-full checkout-btn">Check Out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();
const promoCode = ref('');

const applyPromo = () => {
  if (promoCode.value === 'START10') {
    cart.applyDiscount(10);
  } else if (promoCode.value === 'SALE20') {
    cart.applyDiscount(20);
  } else {
    alert("Invalid promo code");
  }
};
</script>

<style scoped>
.cart-container {
  padding: 80px 20px;
}

.page-title {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 48px;
  text-align: center;
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
  padding: 60px 0;
}

.mt-4 { margin-top: 16px; }

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

.cart-item {
  display: flex;
  padding: 32px 0;
  border-bottom: 1px solid var(--border-color);
  gap: 24px;
}

.cart-item:first-child {
  padding-top: 0;
}

.item-color {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-sm);
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
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
  padding: 32px;
  border-radius: var(--radius-md);
}

.cart-summary h2 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;
}

.promo-row {
  gap: 8px;
}

.promo-row input {
  flex-grow: 1;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
}

.discount {
  color: #34c759;
}

.total {
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.checkout-btn {
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  font-size: 16px;
}
</style>
