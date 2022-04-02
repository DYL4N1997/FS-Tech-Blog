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
    res.render('allposts-loggedin', { posts, logged_in: req.session.logged_in });
  } catch (err)  {
    res.status(500).json(err.message);
  }
});

// Gets a single post, including the comments that are assigned to it
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
                model: User,
                attributes: ['username'], 
            },
            {
                model: Comment,
                include: [User],
            },
          ],
        });

        if (postData) {
        const post = postData.get ({ plain: true });
        res.render('single-post', { post, logged_in: req.session.logged_in });
      } else {
          res.status(404).end();
          console.log('session has ended, try to login again');
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});