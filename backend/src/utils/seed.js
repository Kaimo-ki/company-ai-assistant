const { sequelize, Product, Store, Promocode } = require("../models");

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database for seeding.");
    
    // Ensure tables exist
    await sequelize.sync({ force: true }); // Warning: clears existing data
    
    console.log("Creating products...");
    await Product.bulkCreate([
      { name: "Морская волна", description: "Глубокий синий оттенок с зеленым отливом.", price: 1200, hex_code: "#006994", stock_quantity: 50 },
      { name: "Снежно-белая", description: "Матовая краска для потолков и стен.", price: 800, hex_code: "#FFFFFF", stock_quantity: 100 },
      { name: "Терракота", description: "Теплый оттенок обожженной глины.", price: 1100, hex_code: "#E2725B", stock_quantity: 30 }
    ]);

    console.log("Creating stores...");
    await Store.bulkCreate([
      { address: "ул. Ленина, 15", lat: 55.7558, lon: 37.6173 },
      { address: "пр. Мира, 102", lat: 55.8091, lon: 37.6366 }
    ]);

    console.log("Creating promocodes...");
    await Promocode.bulkCreate([
      { code: "START10", discount_percent: 10, is_active: true },
      { code: "SALE20", discount_percent: 20, is_active: true }
    ]);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
