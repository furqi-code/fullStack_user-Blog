const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

// comments to show on profile page
router.get('/personal', async (req, res) => {
  try{
    const user_id = req.user_id;
    const individual_comments = await executeQuery(`select * from comments where user_id = ?`, [user_id]);
    if(individual_comments.length > 0){
      res.status(200).send({data: individual_comments});
    }else{
      res.status(404).send({message: "no comment available for this blog"});
    }
  }catch(err){
    res.status(500).send({
      message: "Something went wrong"
    })
  }
})

// comments to show under a blog
router.get('/', async (req, res) => {
  try{
    const blog_id = req.query.blog_id;
    const comments = await executeQuery(`select u.username, u.profile_pic, c.comment_id, c.content, c.commented_at
      from comments c inner join users u 
      on c.user_id = u.user_id
      where c.blog_id = ?`, [blog_id]);
    if(comments.length > 0){
      res.status(200).send({data: comments});
    }else{
      res.status(404).send({message: "no comment available for this blog"});
    }
  }catch(err){
    res.status(500).send({
      message: "Something went wrong"
    })
  }
})

router.post('/add', async (req, res) => {
  try{
    const user_id = req.user_id;
    const blog_id = req.query.blog_id;
    const { content } = req.body;
    const post_comment = await executeQuery(`insert into comments(user_id, blog_id, content) 
      values(?,?,?)`, [user_id, blog_id, content])
    // if(post_comment.insertId > 0){
    //   res.status(200).send(`Comment posted under blog_id ${blog_id}`);
    // }else{
    //   res.status().send(`Comment can't be posted under blog_id ${blog_id}`);
    // }
//  fetch all comments for this blog post and send them back so the client can immediately update ui 
//  without needing a separate refresh or additional request
    const comments = await executeQuery(`select u.username, u.profile_pic, c.comment_id, c.content, c.commented_at
      from comments c inner join users u 
      on c.user_id = u.user_id
      where c.blog_id = ?`, [blog_id]);
    if(comments.length > 0){
      res.status(200).send({data: comments});
    }else{
      res.status(404).send({message: "no comment available for this blog"});
    }
  }catch(err){
    res.status(500).send({
      message: "Something went wrong"
    })
  }
})

router.delete('/eliminate', async (req, res) => {
  try{
    const user_id = req.user_id;
    const blog_id = req.query.blog_id;
    const comment_id = req.query.comment_id;
    await executeQuery(`DELETE from comments WHERE user_id = ? AND blog_id = ? AND comment_id = ?`, 
      [user_id, blog_id, comment_id]);
    res.status(200).send(`comment deleted from under blog_id ${blog_id}`);
  }catch(err){
    res.status(500).send({
      message: "Something went wrong"
    })
  }
})

module.exports = router