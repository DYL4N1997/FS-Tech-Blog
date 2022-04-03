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

// Post a blog post
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

// Edit a blog post
router.put('/:id', withAuth, async (req, res) => {
    const body = req.body
    try {
     await Post.update(body, { where: { id: body.id } });
     res.status(200).render('dashboard', { logged_in: req.session.logged_in });
   } catch (err) {
     res.status(500).json(err.message);
   }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
    const postData = await Post.destroy({
     where: { id: req.params.id, user_id: req.session.user_id, },
    });

    if (!postData) {
     res.status(404).json({ message: 'No posts have been found under this ID' });
     return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



module.exports = router;
