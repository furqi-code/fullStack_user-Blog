const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALTROUND = parseInt(process.env.SALTROUND);
const { executeQuery } = require("../mySqldb/Query");

router.get("/profile", async (req, res) => {
  try {
    const user_id = req.user_id;
    const [dbUser] = await executeQuery(
      `SELECT * FROM users WHERE user_id = ?`,
      [user_id]
    );
    res.status(200).send({
      info: dbUser,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.patch("/profile", async (req, res) => {
  try {
    const user_id = req.user_id;
    const { email, username, location, bio } = req.body;
    if (!email) {
      res.status(409).send({ message: "Email is compulsory" }); // to find the user in db
    }
    const [dbUser] = await executeQuery(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (!dbUser) {
      res.status(401).send({ message: "Incorrect Email" });
    }
    await executeQuery(
      `update users set username = ?, location = ?, bio = ? where user_id = ?`,
      [username, location, bio, user_id]
    );
    res.status(200).send({
      message: "User profile updated",
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.get("/favourites", async (req, res) => {
  try {
    const user_id = req.user_id;
    const blogs = await executeQuery(
      `SELECT b.blog_id, b.title, b.description, b.date, b.readTime, b.category, b.imageUrl, b.author
       FROM favouritelist f INNER JOIN blogs b 
       ON f.blog_id = b.blog_id
       WHERE f.user_id = ?`,
      [user_id]
    );
    console.log("favouritelist GET req \n", blogs);

    res.status(200).send({data: blogs});
  } catch (err) {
    console.log("Error fetching favouritelist blogs", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

router.post("/favourites", async (req, res) => {
  try {
    const user_id = req.user_id; 
    const blog_id = req.query.blog_id;
    if (!blog_id) {
      return res.status(400).send({ message: "Blog ID is required" });
    }
    const [existing] = await executeQuery(
      `SELECT * FROM favouritelist WHERE blog_id = ? AND user_id = ?`,
      [blog_id, user_id]
    );
    if (existing){
      return res.status(409).send({
        message: `This blog ${existing.name} already available in your list`,
      });
    }

    const inserted_item = await executeQuery(
      `INSERT INTO favouritelist(user_id, blog_id) VALUES (?, ?)`,
      [user_id, blog_id]
    );
    return res.status(201).send({ message: "Blog inserted in your favouritelist" });
  } catch (err) {
    console.log("Error inserting blogs", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

router.delete("/favourites", async (req, res) => {
  try {
    const user_id = req.user_id;
    const blog_id = req.query.blog_id;
    await executeQuery(
      `delete from favouritelist where user_id = ? AND blog_id = ?`,
      [user_id, blog_id]
    );
    return res.status(200).send(`This Blog deleted from the list`);
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.patch("/change-password", async (req, res) => {
  try {
    const user_id = req.user_id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).send({ message: "Provide necessary details" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ message: "new/confirm Passwords do not match" });
    }
    const [user] = await executeQuery(`SELECT * FROM users WHERE user_id = ?`, [
      user_id,
    ]);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect current password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, SALTROUND);
    await executeQuery(`UPDATE users SET password = ? WHERE user_id = ?`, [
      hashedPassword,
      user_id,
    ]);
    return res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

module.exports = router;
