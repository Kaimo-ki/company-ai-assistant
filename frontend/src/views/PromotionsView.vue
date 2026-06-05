<template>
  <div class="page container">
    <header class="page-hero">
      <p class="badge">Демо-акция для презентации</p>
      <h1>Акции Центра Красок</h1>
      <p>
        Страница показывает, как можно продвигать сезонные предложения, повышать конверсию
        и вести клиента из акции сразу в каталог или заявку.
      </p>
    </header>

    <section class="main-promo">
      <div>
        <span class="promo-label">Акция месяца</span>
        <h2>Скидки до 20% на интерьерные и фасадные краски</h2>
        <p>
          Подберите краску для квартиры, офиса или фасада и оформите заявку через сайт.
          Менеджер уточнит наличие, цвет, объём и доставку.
        </p>

        <div class="promo-actions">
          <router-link to="/" class="btn btn-primary">Перейти в каталог</router-link>
          <router-link to="/profile" class="btn btn-outline">Оставить контакты</router-link>
        </div>
      </div>

      <div class="discount-box">
        <span>до</span>
        <strong>20%</strong>
        <p>на выбранные товары</p>
      </div>
    </section>

    <section class="promo-grid">
      <article class="promo-card">
        <h3>Комплект для ремонта</h3>
        <p>Краска + грунтовка + инструменты. Удобно для клиентов, которые хотят купить всё сразу.</p>
      </article>

      <article class="promo-card">
        <h3>Консультация по цвету</h3>
        <p>Менеджер помогает подобрать оттенок под интерьер, площадь и тип поверхности.</p>
      </article>

      <article class="promo-card">
        <h3>Доставка по Алматы</h3>
        <p>После оформления заявки менеджер рассчитывает доставку и согласует удобное время.</p>
      </article>
    </section>

    <section class="notice">
      <b>Важно:</b> эта акция добавлена как демонстрационный блок для макета.
      Перед публикацией реальных скидок нужно согласовать текст, даты и условия с руководством.
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: 90px 20px 110px;
}

.page-hero {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 52px;
}

.badge {
  color: var(--text-secondary);
  margin-bottom: 14px;
}

.page-hero h1 {
  font-size: clamp(42px, 7vw, 72px);
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 18px;
}

.page-hero p {
  color: var(--text-secondary);
  font-size: 19px;
}

.main-promo {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 28px;
  align-items: stretch;
  background: var(--text-color);
  color: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 40px;
  margin-bottom: 34px;
}

.promo-label {
  display: inline-flex;
  background: color-mix(in srgb, var(--bg-color) 14%, transparent);
  border-radius: 999px;
  padding: 7px 12px;
  margin-bottom: 18px;
  font-size: 13px;
}

.main-promo h2 {
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.05;
  letter-spacing: -1.5px;
  max-width: 800px;
  margin-bottom: 18px;
}

.main-promo p {
  color: color-mix(in srgb, var(--bg-color) 76%, transparent);
  font-size: 17px;
  max-width: 660px;
}

.promo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.discount-box {
  border: 1px solid color-mix(in srgb, var(--bg-color) 18%, transparent);
  border-radius: var(--radius-lg);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 28px;
}

.discount-box span {
  font-size: 22px;
}

.discount-box strong {
  font-size: clamp(72px, 11vw, 130px);
  line-height: 0.9;
  letter-spacing: -4px;
}

.discount-box p {
  margin-top: 10px;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.promo-card,
.notice {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px;
}

.promo-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.promo-card p,
.notice {
  color: var(--text-secondary);
}

.notice {
  margin-top: 18px;
}

@media (max-width: 850px) {
  .main-promo,
  .promo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
