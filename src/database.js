const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }

  dataStore = [];
  result.forEach(item => {
      dataStore.push({
      id: item.id,
      name: item.name,
      price: item.price
    })
  });

  console.log("Connection established");
});

module.exports = db
