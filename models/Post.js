const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    }, 
    post_data {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    


module.exports = Project;
