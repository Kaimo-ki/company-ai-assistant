<template>
  <article class="product-card">
    <div class="color-preview" :style="{ backgroundColor: product.hex_code || '#f5f5f7' }">
      <span class="badge" v-if="product.badge">{{ product.badge }}</span>
      <div class="overlay">
        <button class="btn btn-outline btn-sm action-btn" @click.stop="addToCart">
          {{ added ? 'Добавлено' : 'В корзину' }}
        </button>
      </div>
    </div>

    <div class="product-info">
      <div class="meta-row">
        <span>{{ product.brand }}</span>
        <span>{{ product.volume }}</span>
      </div>

      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.description }}</p>

      <div class="details">
        <span>{{ product.category }}</span>
        <span>{{ product.stock }}</span>
        <span>Арт: {{ product.article }}</span>
      </div>

      <div class="bottom-row">
        <div>
          <span class="product-price">{{ formatPrice(product.price) }}</span>
          <span v-if="product.oldPrice" class="old-price">{{ formatPrice(product.oldPrice) }}</span>
        </div>
        <button class="btn btn-primary btn-sm" @click.stop="addToCart">
          +
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()
const added = ref(false)

function formatPrice(value) {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(Number(value || 0))
}

function addToCart() {
  cart.addItem(props.product)
  added.value = true

  window.setTimeout(() => {
    added.value = false
  }, 1200)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--text-color);
}

.color-preview {
  height: 190px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 14px;
}

.badge {
  background: rgba(0, 0, 0, 0.78);
  color: white;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
  backdrop-filter: blur(2px);
}

.product-card:hover .overlay {
  opacity: 1;
}

.action-btn {
  background: white;
  color: black;
  border: none;
}

.product-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.meta-row,
.details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 12px;
}

.meta-row {
  justify-content: space-between;
  margin-bottom: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: 650;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.product-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.details {
  margin-bottom: 18px;
}

.details span {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 5px 8px;
}

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.product-price {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.old-price {
  display: block;
  color: var(--text-secondary);
  font-size: 13px;
  text-decoration: line-through;
}

.btn-sm {
  padding: 8px 14px;
  font-size: 13px;
}
</style>
