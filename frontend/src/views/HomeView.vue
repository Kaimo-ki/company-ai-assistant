<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content text-center">
        <p class="badge">Центр Красок №1 • AI-консультант</p>
        <h1 class="title">Подберём краску, покрытие и инструменты для вашего проекта</h1>
        <p class="subtitle">
          ИИ поможет выбрать материал, найти похожий оттенок, узнать про акции и подсказать ближайшую точку продаж.
        </p>
        <router-link to="/chat" class="btn btn-primary mt-6">
          Попробовать ИИ-помощника
        </router-link>
      </div>
    </header>

    <section class="catalog container">
      <div class="section-header">
        <h2 class="section-title">Популярные оттенки и материалы</h2>
        <span class="view-all">Акции и доставка скоро</span>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
      </div>

      <div v-else class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    products.value = await res.json();
  } catch (err) {
    products.value = [
      { id: 1, name: "Морская волна", description: "Глубокий сине-зелёный оттенок для спокойного интерьера.", price: "1200", hex_code: "#006994" },
      { id: 2, name: "Снежно-белая", description: "Матовая краска для стен и потолков.", price: "800", hex_code: "#FFFFFF" },
      { id: 3, name: "Терракота", description: "Тёплый оттенок для акцентных стен и декора.", price: "1100", hex_code: "#E2725B" },
      { id: 4, name: "Графит", description: "Глубокий серый цвет для современного дизайна.", price: "1300", hex_code: "#1C1C1E" }
    ];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hero {
  padding: 160px 20px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  max-width: 900px;
}

.text-center {
  text-align: center;
}

.badge {
  color: var(--text-secondary);
  margin-bottom: 18px;
  font-size: 15px;
}

.title {
  font-size: clamp(42px, 7vw, 72px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.05;
  margin-bottom: 24px;
}

.subtitle {
  font-size: clamp(18px, 3vw, 24px);
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 720px;
  margin: 0 auto;
}

.mt-6 {
  margin-top: 32px;
}

.catalog {
  padding-bottom: 120px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.view-all {
  color: var(--text-secondary);
  font-size: 15px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.loading-state {
  padding: 60px 0;
  text-align: center;
  color: var(--text-secondary);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top-color: var(--text-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>