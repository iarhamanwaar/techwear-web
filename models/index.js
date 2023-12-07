const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");
const process = require("process");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

function initializeDatabase() {
  return sequelize
    .authenticate()
    .then(function () {
      console.log(
        "PostgreSQL Database connection has been established successfully."
      );
      return sequelize.sync({ alter: true });
    })
    .then(function () {
      console.log("Database tables have been synchronized.");
    })
    .catch(function (error) {
      console.error("Error synchronizing the database:", error);
    });
}

module.exports = sequelize;
module.exports.initializeDatabase = initializeDatabase;
