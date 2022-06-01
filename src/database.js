// use mysql2 instead of mysql
const mysql = require('mysql2');

// const dbpool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   waitForConnections: true,
//   connectionLimit: process.env.CONNECTION_LIMIT, 
//   queueLimit: process.env.QUEUE_LIMIT
// });

// database connection using environment variable
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.DATABASE_NAME,
// });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bot_database',
  rowAsArray: true
});

// Connected status if not error that console will print out Connected !
db.connect(function(err) {
  if (err) throw err;
  // console.log("Connected!");
});

// string variable for selecting the anggota 
let queryAnggota = 'SELECT nama FROM `anggota` WHERE `status` = '
let anggotaPresence = '1';
let anggotaAbsence = '0';

// get data from tb_anggota
// function presence() { 
//   db.query(
//     queryAnggota + anggotaPresence, (err, results, fields) => {
//       if(err) throw err;
//       if(results == null) return 'tidak terdapat data';
//       console.log(results); // results contains rows returned by server
//       // console.log(fields); // fields contains extra meta data about results, if available
//   })
//   return results;
// } 





// console.log(`Daftar kehadiran dari absensi anda hari ini adalah ${Object.values(presence)}`);

// get data from tb_anggota
let absence =  {
nama : 
  db.query(
    queryAnggota + anggotaAbsence, (err, results, fields) => {
      if(err) throw err;
      if(results == null) return 'tidak terdapat data';
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
      return results
  })
} 

// console.log(`Daftar ketidakhadiran dari absensi anda hari ini adalah ${absence}`)

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


module.exports =  db;
