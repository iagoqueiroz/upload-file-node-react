const { DataTypes } = require("sequelize");
const database = require("../config/db");

const File = database().define("File", {
  name: DataTypes.STRING,
  size: DataTypes.INTEGER,
  url: DataTypes.STRING,
});

module.exports = File;
