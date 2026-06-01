const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const storeRoutes = require("./routes/storeRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("CENTER KRASOK AI BACKEND WORKS (SQLite)");
});

app.get("/db-test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "database connected",
      dialect: sequelize.getDialect()
    });
  } catch (error) {
    res.status(500).json({
      status: "database error",
      error: error.message
    });
  }
});

// Sync models and start server
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to sync database:", err);
});