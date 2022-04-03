const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
 try {
     const postData = await Post.findAll({
      where: { user_id: req.session.user_id, },
      attributes: ["id", "title", "content"],
      include: [{ model: User, attributes: ["username"],
     }, 
    ],
});

    const posts = postData.map((post) => post.get ({ plain: true }));
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
    } catch (err) {
    res.redirect("login");
    };
});

