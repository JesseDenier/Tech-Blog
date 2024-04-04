// This allows us to view, create, and manipulate SQL data through a server.
const Sequelize = require("sequelize");
// Allows private MySql info to be saved seperately, and referenced below.
require("dotenv").config();

// A custom instance of Sequelize that has its own port along with personal login info.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
