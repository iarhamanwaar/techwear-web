const { DataTypes } = require("sequelize");
const sequelize = require(".");
const CartItem = require("./cartitem");

const Cart = sequelize.define("Cart", {
  total: { type: DataTypes.FLOAT, defaultValue: 0 },
});

CartItem.belongsTo(Cart, { foreignKey: "cartId" });
Cart.hasMany(CartItem, { foreignKey: "cartId" });

module.exports = Cart;
