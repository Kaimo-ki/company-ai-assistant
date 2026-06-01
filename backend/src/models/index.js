const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("client", "admin"),
    defaultValue: "client",
  },
  last_lat: DataTypes.FLOAT,
  last_lon: DataTypes.FLOAT,
});

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  hex_code: DataTypes.STRING(7),
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const Store = sequelize.define("Store", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  delivery_time_min: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM("pending", "paid", "delivering", "completed"),
    defaultValue: "pending",
  },
});

const Promocode = sequelize.define("Promocode", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discount_percent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const AIInteraction = sequelize.define("AIInteraction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  original_img_url: DataTypes.STRING,
  generated_img_url: DataTypes.STRING,
});

// Define Relationships
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(AIInteraction, { foreignKey: "user_id" });
AIInteraction.belongsTo(User, { foreignKey: "user_id" });

Promocode.hasMany(AIInteraction, { foreignKey: "promo_offered" });
AIInteraction.belongsTo(Promocode, { foreignKey: "promo_offered" });

module.exports = {
  sequelize,
  User,
  Product,
  Store,
  Order,
  Promocode,
  AIInteraction,
};
