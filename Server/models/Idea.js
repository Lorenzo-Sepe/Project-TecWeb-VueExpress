import { DataTypes } from "sequelize";

export function createModel(database){
  database.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: false,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userMail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    //by default, Sequelize adds the createdAt and updatedAt fields to all models
  }, {

  })
}

