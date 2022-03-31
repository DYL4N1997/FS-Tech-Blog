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
    post_data: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
