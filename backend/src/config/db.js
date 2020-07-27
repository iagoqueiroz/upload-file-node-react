const { Sequelize } = require("sequelize");
const path = require("path");

const dbPath = path.resolve(__dirname, "..", "db", "database.sqlite");

let database = null;

module.exports = () => {
  if (!database) {
    const sequelize = new Sequelize({
      storage: dbPath,
      dialect: "sqlite",
    });

    database = sequelize;

    sequelize
      .authenticate()
      .then(() => {
        console.log("\n-- The database is connected\n");
      })
      .then(() => {
        sequelize.sync().then(() => {
          console.log("\n-- All the tables are synced\n");

          return database;
        });
      });
  }

  return database;
};
