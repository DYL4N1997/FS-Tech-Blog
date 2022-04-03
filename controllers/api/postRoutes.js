const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
     const postData = await Post.findAll({});

     res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err.message);
    }
});



module.exports = router;
