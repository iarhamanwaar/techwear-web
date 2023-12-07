const { DataTypes } = require("sequelize");
const sequelize = "./index";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
