<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content text-center">
        <p class="badge">Центр Красок №1 • AI-консультант • Алматы</p>
        <h1 class="title">Подберём краску, покрытие и инструменты для вашего ремонта</h1>
        <p class="subtitle">
          Каталог, заявки, акции, доставка и филиалы в одном цифровом сервисе. Этот MVP показывает,
          как Центр Красок может превратить сайт в удобный канал продаж.
        </p>

        <div class="hero-actions">
          <a href="#catalog" class="btn btn-primary">Смотреть каталог</a>
          <router-link to="/profile" class="btn btn-outline">Оставить заявку</router-link>
        </div>
      </div>
    </header>

    <section class="proof container">
      <div class="proof-card">
        <span>12+</span>
        <p>демо-товаров в каталоге</p>
      </div>
      <div class="proof-card">
        <span>2</span>
        <p>филиала в Алматы</p>
      </div>
      <div class="proof-card">
        <span>24/7</span>
        <p>приём заявок через сайт</p>
      </div>
      <div class="proof-card">
        <span>AI</span>
        <p>помощник можно подключить позже</p>
      </div>
    </section>

    <section class="promo-strip container">
      <div>
        <p class="badge">Акция месяца</p>
        <h2>Скидки до 20% на популярные краски и товары для ремонта</h2>
        <p>
          Демонстрационная промо-страница показывает, как можно продвигать сезонные предложения
          и вести клиентов сразу в каталог.
        </p>
      </div>
      <router-link to="/promotions" class="btn btn-primary">Посмотреть акции</router-link>
    </section>

    <section id="catalog" class="catalog container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Каталог товаров</h2>
          <p class="section-subtitle">
            Демо-каталог можно позже заменить на реальные данные, полученные парсером или API.
          </p>
        </div>
        <router-link to="/delivery" class="view-all">Доставка по Алматы →</router-link>
      </div>

      <div class="catalog-tools">
        <input
          v-model="search"
          type="search"
          placeholder="Поиск: краска, грунтовка, Tikkurila..."
        />

        <select v-model="selectedCategory">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <section class="branches container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Филиалы Центра Красок в Алматы</h2>
          <p class="section-subtitle">
            Клиент сразу видит адрес, время работы и может построить маршрут.
          </p>
        </div>
      </div>

      <div class="branches-grid">
        <div class="map-card">
          <iframe
            title="Карта филиалов Центра Красок"
            src="https://www.google.com/maps?q=%D0%9A%D0%B0%D0%B1%D0%B4%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%201%2F8%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B%20%D0%A2%D0%9A%20ARMADA&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div class="branch-list">
          <article class="branch-card">
            <span class="branch-label">Филиал 1</span>
            <h3>ТК ARMADA, бутик 14</h3>
            <p>Алматы, ул. Кабдолова 1/8, блок 1, линия D</p>
            <p>Пн–Вс: 10:00–20:00</p>
            <a class="btn btn-outline btn-full" target="_blank" href="https://www.google.com/maps/search/?api=1&query=%D0%9A%D0%B0%D0%B1%D0%B4%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%201%2F8%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B%20ARMADA">
              Построить маршрут
            </a>
          </article>

          <article class="branch-card">
            <span class="branch-label">Филиал 2</span>
            <h3>ТК ARMADA, бутик 21</h3>
            <p>Алматы, ул. Кабдолова 1/8, блок 1, линия D</p>
            <p>Пн–Вс: 10:00–20:00</p>
            <a class="btn btn-outline btn-full" target="_blank" href="https://www.google.com/maps/search/?api=1&query=%D0%9A%D0%B0%D0%B1%D0%B4%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%201%2F8%20%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B%20ARMADA">
              Построить маршрут
            </a>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { catalogProducts } from '../data/catalog'

const search = ref('')
const selectedCategory = ref('Все')

const categories = computed(() => {
  const unique = new Set(catalogProducts.map(product => product.category))
  return ['Все', ...unique]
})

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase()

  return catalogProducts.filter(product => {
    const matchesCategory = selectedCategory.value === 'Все' || product.category === selectedCategory.value
    const searchText = `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase()
    const matchesSearch = !query || searchText.includes(query)

    return matchesCategory && matchesSearch
  })
})
</script>

<style scoped>
.hero {
  padding: 150px 20px 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(circle at top left, rgba(0, 0, 0, 0.08), transparent 32%),
    radial-gradient(circle at top right, rgba(0, 0, 0, 0.06), transparent 28%);
}

.hero-content {
  max-width: 980px;
}

.text-center {
  text-align: center;
}

.badge {
  display: inline-flex;
  color: var(--text-secondary);
  margin-bottom: 18px;
  font-size: 15px;
}

.title {
  font-size: clamp(42px, 7vw, 74px);
  font-weight: 750;
  letter-spacing: -2.7px;
  line-height: 1.04;
  margin-bottom: 24px;
}

.subtitle {
  font-size: clamp(18px, 3vw, 23px);
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 790px;
  margin: 0 auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.proof {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 60px;
}

.proof-card {
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  border-radius: var(--radius-md);
  padding: 24px;
}

.proof-card span {
  display: block;
  font-size: 30px;
  font-weight: 750;
  margin-bottom: 8px;
}

.proof-card p {
  color: var(--text-secondary);
}

.promo-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  background: var(--text-color);
  color: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 34px;
  margin-bottom: 80px;
}

.promo-strip .badge,
.promo-strip p {
  color: color-mix(in srgb, var(--bg-color) 76%, transparent);
}

.promo-strip h2 {
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1.1;
  margin-bottom: 12px;
  max-width: 760px;
}

.catalog,
.branches {
  padding-bottom: 100px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 32px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.8px;
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--text-secondary);
  max-width: 620px;
}

.view-all {
  color: var(--text-secondary);
  font-size: 15px;
}

.view-all:hover {
  color: var(--text-color);
}

.catalog-tools {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 14px;
  margin-bottom: 32px;
}

.catalog-tools input,
.catalog-tools select {
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 999px;
  padding: 14px 18px;
  font-size: 15px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
  gap: 26px;
}

.branches-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 24px;
}

.map-card,
.branch-card {
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.map-card iframe {
  width: 100%;
  height: 520px;
  border: 0;
  display: block;
}

.branch-list {
  display: grid;
  gap: 18px;
}

.branch-card {
  padding: 24px;
}

.branch-label {
  display: inline-flex;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.branch-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
}

.branch-card p {
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.btn-full {
  width: 100%;
  margin-top: 16px;
}

@media (max-width: 900px) {
  .proof,
  .branches-grid,
  .catalog-tools {
    grid-template-columns: 1fr;
  }

  .promo-strip,
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 700px) {
  .proof {
    grid-template-columns: 1fr 1fr;
  }

  .hero {
    padding-top: 110px;
  }
}
</style>
