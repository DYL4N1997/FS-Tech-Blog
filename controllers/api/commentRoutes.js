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
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
      } catch (err) {
          res.status(500).json(err.message);
      }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment waas found relating to the ID'});
            return;
        } 

       res.status(200).json(commentData);
    }  catch (err) {
        res.status(500).json(err.message);
    } 
});

module.exports = router;
