const User = require('./User');
const Comment = require ('./Comment');
const Post = require ('./Post');


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
