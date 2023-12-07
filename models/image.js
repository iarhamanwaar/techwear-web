const { DataTypes } = require("sequelize");
const sequelize = "./index";

const Image = sequelize.define("Image", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
