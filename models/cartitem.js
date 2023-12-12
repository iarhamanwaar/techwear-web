const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Product = require("./product");

const CartItem = sequelize.define("CartItem", {
  cartId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

CartItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = CartItem;
