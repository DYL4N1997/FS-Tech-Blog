const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

    Comment.init(
     {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             allowNull: false,
             autoIncrement: true,
         },
         comment_data: {
             type: DataTypes.STRING,
             unique: true,
             allowNull: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
         },
         date_created: {
             type: DataTypes.DATEONLY,
             defaultValue: DataTypes.NOW,
             allowNull: false,
         },
         post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
     },
     {
         
     }

    ) 