const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all available comments
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        console.log(comments);

        res.render('single-post', { comments, logged_in: req.session.logged_in});
      } catch (err) {
          res.status(500).json(err.message);
      }
});

// // Route to POST a comment
// router.post('/', withAuth, async (req, res) => {
//     const
// })


module.exports = router;
