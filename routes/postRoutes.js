const express = require('express');
const post = require('../models/post');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.post('/',auth,authorize('Author','Admin'),async (req,res)=>{
    try{
        const post = await post.create({...req.body});
        res.status(201).json(post); 
    }catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.get('/', async (req, res) => {
    try {
      const { tag, status } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (tag) filter.tags = tag;
  
      const posts = await Post.find(filter);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });
  
  router.put('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update post' });
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete post' });
    }
  });
  
  module.exports = router;