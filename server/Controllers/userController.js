import { resolve } from "path";
import connection from "../DB/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
          reject("Username already exists");
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
      return res.status(400).send({ error });
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

const checkValidUser = (userName) => {
  const sql = `SELECT * FROM ?? WHERE userName = ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, [userTable, userName], (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        reject(err);
      } else {
        if (results.length <= 0) {
          reject(new Error("User Not Found"));
        } else {
          resolve(results[0]); // Pass user data (including hashed password) to resolve
        }
      }
    });
  });
};

const updateLastLogin = async (userId, callback) => {
  const sql = `UPDATE ?? SET lastLogin = ? WHERE id = ?`;
  await connection.query(sql, [userTable, new Date(), userId], (error, success) => {
    if (error) {
      console.error("Error updating lastLogin:", error);
      return callback(error, null);
    }

    callback(null, success);
  });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await checkValidUser(userName);

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        updateLastLogin(user.id, (error, success) => {
          if (error) {
            return res.status(500).send({ error: "Internal Server Error" });
          } else{
            console.log(success)
          }
        });
        const token = jwt.sign(
          {
            user,
          },
          "secret",
          { expiresIn: "1h" }
        );
        const { password, ...userWithoutPassword } = user;
        res.cookie('token', token)
        return res.status(201).json({
          message: "User login successfully",
          user: userWithoutPassword,
        });
      } else {
        return res.status(400).send({ error: "Wrong password" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
};

const getUsers = async (req,res) =>{
  res.status(201).send({message: 'migara'})
}

export default {
  registerUser,
  loginUser,
  getUsers,
};
