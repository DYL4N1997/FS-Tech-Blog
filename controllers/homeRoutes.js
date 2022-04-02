const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
    //   Get all post data, including the User
     const postData = await Post.findAll({
         include: [
            { 
             model: User,
             attributes: ['username'],
            },
         ],
    });

    // Serialization of the data
    const posts = postData.map((post) => post.get({ plain: true }));
    // Rendering of posts & location
    res.render('homepage-admin', { posts, logged_in: req.session.logged_in });
  } catch (err)  {
    res.status(500).json(err.message);
  }
});