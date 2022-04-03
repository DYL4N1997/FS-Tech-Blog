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

