const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost", // Change this to your MySQL server host
  user: "Vanessa", // Change this to your MySQL username
  password: "myroxane5", // Change this to your MySQL password
  database: "first", // Change this to your MySQL database name
});

// Connect to the database
const connectingToDb = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log("Error connecting to Db");
        reject(err);
      } else {
        console.log("Connection established");
        resolve();
      }
    });
  });
};

module.exports = {
  connectingToDb,
  connection,
};
