const express = require("express");
const Router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

Router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let blogs ;
    if(category === 'blogs'){
      blogs = await executeQuery(`select * from blogs`);
    }else{
      blogs = await executeQuery(`select * from blogs where category = ?`, [category]);
    }
    if(blogs.length === 0){
      res.status(401).send({message: "couldnt fetch blogs from db"})
    }else{
      res.status(200).send({data: blogs})
    }
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = Router;
