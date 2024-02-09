import connection from "../DB/connection.js";
import bcrypt from "bcrypt";

const userTable = "users";

const checkUserNameExist = (userName) => {
  const sql = `SELECT id FROM ?? WHERE userName = ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, [userTable, userName], (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        reject(err);
      } else {
        if (results.length > 0) {
          reject(new Error("Username already exists"));
        } else {
          resolve();
        }
      }
    });
  });
};


const createUserTable = async () => {
  const userTable = "users";
  const sql = `
      CREATE TABLE IF NOT EXISTS ${userTable} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        userName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  return new Promise((resolve, reject) => {
    connection.query(sql, (err) => {
      if (err) {
        console.error("Error creating table:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const registerUser = async (req, res) => {
    try {
      await createUserTable();
  
      const { firstName, userName, email, password, role } = req.body;
  
      try {
        await checkUserNameExist(userName);
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const sql = `INSERT INTO ?? (firstName, userName, email, password, role, lastLogin) VALUES (?, ?, ?, ?, ?, ?)`;
      connection.query(
        sql,
        [userTable, firstName, userName, email, hashPassword, role, new Date()],
        (error, result) => {
          if (error) {
            console.error("Error inserting user:", error);
            return res.status(500).send({ error });
          }
  
          return res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  };
  

const loginUser = (req, res) => {
  // Your login logic here
};

export default {
  registerUser,
  loginUser,
};

