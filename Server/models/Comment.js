import { DataTypes } from "sequelize";

export function createModel(database){
  database.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userMail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: false,
      allowNull: false
    },
    
    //by default, Sequelize adds the createdAt and updatedAt fields to all models and the external keys defined in the database.js file
  }, {

  })
}

