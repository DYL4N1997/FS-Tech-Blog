const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts
