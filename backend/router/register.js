const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const SALTROUND = parseInt(process.env.SALTROUND) || 10;
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profile_pic = "https://st2.depositphotos.com/1537427/5859/v/950/depositphotos_58597527-stock-illustration-female-user-icon.jpg"
    // const created_at = new Date().toISOString().split('T')[0];
    if (!username || !email || !password) {
      return res.status(409).send("Incomplete credentials");
    }
    const existingUser = await executeQuery(
      `SELECT * FROM users WHERE email = ? OR username = ?`,
      [email, username]
    );
    if (existingUser.length > 0)
      return res.status(409).send("User already exists with this Email / username");

    const hashedPassword = await bcrypt.hash(password, SALTROUND);
    const insertedUser = await executeQuery(
      `INSERT INTO users(username, email, password, profile_pic) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, profile_pic]
    );

    if (insertedUser.insertId > 0) {
      return res.status(200).send("Registration/signup successful");
    } else {
      return res.status(500).send("Error inserting user in DB");
    }
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = Router;
