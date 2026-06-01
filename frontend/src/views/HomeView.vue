<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content text-center">
        <h1 class="title">Find your perfect shade.</h1>
        <p class="subtitle">AI-powered paint matching. Premium quality. Delivered to your door.</p>
        <button class="btn btn-primary mt-6">Try AI Assistant</button>
      </div>
    </header>

    <section class="catalog container">
      <div class="section-header">
        <h2 class="section-title">Featured Colors</h2>
        <a href="#" class="view-all">View all &rarr;</a>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
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
const error = ref(null);

onMounted(async () => {
  try {
    // For local development, assuming backend runs on port 3000
    const res = await fetch('http://localhost:3000/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    products.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Unable to load products. Please try again later.";
    
    // Mock data fallback for design preview if backend is down
    products.value = [
      { id: 1, name: "Морская волна", description: "Глубокий синий оттенок с зеленым отливом.", price: "1200", hex_code: "#006994" },
      { id: 2, name: "Снежно-белая", description: "Матовая краска для потолков и стен.", price: "800", hex_code: "#FFFFFF" },
      { id: 3, name: "Терракота", description: "Теплый оттенок обожженной глины.", price: "1100", hex_code: "#E2725B" },
      { id: 4, name: "Угольный черный", description: "Глубокий черный для акцентов.", price: "1300", hex_code: "#1C1C1E" }
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
  max-width: 800px;
}

.text-center {
  text-align: center;
}

.title {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.05;
  margin-bottom: 24px;
}

.subtitle {
  font-size: clamp(18px, 3vw, 24px);
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 600px;
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

.view-all:hover {
  color: var(--text-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.loading-state, .error-state {
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
