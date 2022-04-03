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

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
     const newPost = await Post.create({
     ...body, user_id: req.session.user_id,
     });

     res.status(200).json(newPost);
   } catch (err) {
     res.status(400).json(err.message);
   }
});

module.exports = router;
