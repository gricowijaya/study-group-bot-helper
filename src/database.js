var mysql = require('mysql2');

var db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// db.connect((err) => {
//   if (err) {
//     console.log("Error connecting to Db");
//     return;
//   }

//   dataStore = [];
//   result.forEach(item => {
//       dataStore.push({
//       id: item.id,
//       name: item.name,
//       price: item.price
//     })
//   });

//   console.log("Connection established");
// });


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });

exports = db
