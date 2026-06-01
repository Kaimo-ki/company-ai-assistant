<template>
  <div class="product-card group">
    <div class="color-preview" :style="{ backgroundColor: product.hex_code }">
      <div class="overlay">
        <button class="btn btn-outline btn-sm action-btn">Quick View</button>
      </div>
    </div>
    <div class="product-info">
      <div class="info-header">
        <h3 class="product-name">{{ product.name }}</h3>
        <span class="product-price">{{ product.price }} ₽</span>
      </div>
      <p class="product-desc">{{ product.description }}</p>
      <div class="card-actions">
        <button class="btn btn-primary btn-full">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--surface-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.color-preview {
  height: 200px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
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
  transform: translateY(10px);
  transition: transform var(--transition-fast);
}

.product-card:hover .action-btn {
  transform: translateY(0);
}

.product-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.3px;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
}

.product-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.btn-full {
  width: 100%;
}
</style>
