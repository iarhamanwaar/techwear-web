const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
});

module.exports = Review;
