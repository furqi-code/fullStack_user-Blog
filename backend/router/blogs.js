const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

// Fetch blogs by category or all if category is 'all' or missing
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let blogs;
    if (!category || category === 'all') {
      blogs = await executeQuery(`SELECT * FROM blogs`);
    } else {
      blogs = await executeQuery(`SELECT * FROM blogs WHERE category = ?`, [category]);
    }

    if (blogs.length === 0) {
      return res.status(200).send({ data: [] });
    }
    res.status(200).send({ data: blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// Fetch one blog by blog_id
router.get("/oneBlog", async (req, res) => {
  try {
     const { category, blog_id } = req.query;
    // not using category AND blog_id bcz what if user opens a blog from home/all page
    if (!blog_id) {
      return res.status(400).send({ message: "blog_id query parameter is required" });
    }

    const blogs = await executeQuery(`SELECT * FROM blogs WHERE blog_id = ?`, [blog_id]);
    if (blogs.length === 0) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).send({ data: blogs[0] });  // Send single blog object for clarity
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).send({
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;

