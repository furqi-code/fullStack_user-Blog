const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

router.get("/", async (req, res) => {
  try {
    const user_id = req.user_id;
    const blogs = await executeQuery(`SELECT * FROM blogs WHERE user_id = ?`, [user_id]);
    if (blogs.length === 0) {
      return res.status(404).send({data: []});
    }
    res.status(200).send({ data: blogs });
  } catch (err) {
    console.error("Error fetching your blogs:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/addBlog", async (req, res) => {
  try {
    const user_id = req.user_id;
    let { title, description, date, readTime, category, imageUrl, author } = req.body;
    if(!title || !description || !readTime || !category || !date){
      return res.status(400).send({message: 'Provide all the input fields'});
    }
    const [isBlogExist] = await executeQuery(
      `SELECT * FROM blogs WHERE title = ? AND description = ?`,
      [title, description]
    );
    if (isBlogExist) {
      return res.status(409).send({ message: `you have already posted ${isBlogExist.title} blog in our DB` });
    }

    if (!author) {
      let [newAuthor] = await executeQuery(`SELECT username FROM users WHERE user_id = ?`, [user_id]);
      author = newAuthor.username;
    }
    if (!imageUrl) {
      imageUrl =
        "https://spheremedium.com/wp-content/uploads/2025/06/sphere-medium-blog-featured-images-2025-06-05T232020.016-1.webp";
    }

    const inserted_item = await executeQuery(
      `INSERT INTO blogs(user_id, title, description, date, readTime, category, imageUrl, author)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, description, date, readTime, category, imageUrl, author]
    );
    if (inserted_item.insertId > 0) {
      res.status(200).send("Blog inserted in DB");
    } else {
      throw { message: "Error inserting blog in DB" };
    }
  } catch (err) {
    console.log("Error inserting your blog", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

module.exports = router;
