<template>
  <div class="page container">
    <header class="page-hero">
      <p class="badge">Доставка и самовывоз</p>
      <h1>Получите заказ удобным способом</h1>
      <p>
        Страница объясняет клиенту, как оформить доставку, где забрать товар и что произойдёт после заявки.
      </p>
    </header>

    <section class="delivery-grid">
      <article class="delivery-card featured">
        <span>01</span>
        <h2>Доставка по Алматы</h2>
        <p>
          Оформите заявку на сайте. Менеджер уточнит адрес, объём заказа, наличие товара
          и рассчитает стоимость доставки.
        </p>
        <router-link to="/profile" class="btn btn-primary">Оставить заявку</router-link>
      </article>

      <article class="delivery-card">
        <span>02</span>
        <h2>Самовывоз</h2>
        <p>
          Заберите заказ из филиалов Центра Красок в ТК ARMADA:
          Алматы, ул. Кабдолова 1/8, блок 1, линия D, бутики 14 и 21.
        </p>
      </article>

      <article class="delivery-card">
        <span>03</span>
        <h2>Помощь менеджера</h2>
        <p>
          Если клиент не уверен в количестве краски, менеджер может подсказать примерный расход
          по площади и типу поверхности.
        </p>
      </article>
    </section>

    <section class="steps">
      <h2>Как это работает</h2>

      <div class="steps-grid">
        <div>
          <b>1. Выберите товар</b>
          <p>Добавьте краску, грунтовку или инструменты в корзину.</p>
        </div>

        <div>
          <b>2. Оставьте контакты</b>
          <p>Имя и телефон сохраняются в личном кабинете и истории заявок.</p>
        </div>

        <div>
          <b>3. Менеджер связывается</b>
          <p>Согласовывает наличие, цвет, доставку и итоговую стоимость.</p>
        </div>
      </div>
    </section>

    <section class="delivery-note">
      <b>Для реального запуска:</b> сюда можно подключить расчёт доставки, интеграцию с CRM,
      Telegram-уведомления менеджеру и статус заявки.
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

.delivery-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 34px;
}

.delivery-card,
.steps,
.delivery-note {
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.delivery-card span {
  color: var(--text-secondary);
  font-size: 13px;
}

.delivery-card h2 {
  font-size: 27px;
  margin: 12px 0;
  letter-spacing: -0.6px;
}

.delivery-card p {
  color: var(--text-secondary);
  margin-bottom: 22px;
}

.featured {
  background: var(--text-color);
  color: var(--bg-color);
}

.featured p,
.featured span {
  color: color-mix(in srgb, var(--bg-color) 76%, transparent);
}

.steps h2 {
  font-size: 30px;
  margin-bottom: 22px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.steps-grid div {
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  border-radius: var(--radius-md);
  padding: 20px;
}

.steps-grid p {
  color: var(--text-secondary);
  margin-top: 8px;
}

.delivery-note {
  margin-top: 18px;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .delivery-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
