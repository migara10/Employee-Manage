// connection.js

import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

const DB = "Employees";

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  } else {
    console.log("Connected to MySQL");

    // Create a database if it doesn't exist
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB}`, (err) => {
      if (err) {
        console.error("Error creating database:", err);
        connection.end();
        return;
      }

      // Use the database
      connection.query(`USE ${DB}`, (err) => {
        if (err) {
          console.error("Error selecting database:", err);
          connection.end();
          return;
        }

        
      });
    });
  }
});

export default connection;
