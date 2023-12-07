const { DataTypes } = require("sequelize");
const sequelize = "./index";

const Order = sequelize.define("Order", {
  date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Order;
