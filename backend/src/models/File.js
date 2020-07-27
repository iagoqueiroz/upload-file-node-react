const { DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const database = require("../config/db");

const File = database().define("File", {
  name: DataTypes.STRING,
  size: DataTypes.INTEGER,
  url: DataTypes.STRING,
});

File.addHook("beforeDestroy", async file => {
  fs.unlink(
    path.resolve(__dirname, "..", "..", "public", "uploads", file.name),
    err => {
      if (err) throw err;
    }
  );
});

module.exports = File;
