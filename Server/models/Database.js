import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database);
createIdeaModel(database);

export const {User, Idea} = database.models;

//associations configuration
User.Ideas = User.hasMany(Idea,{
  foreignKey: "UserMail",
  sourceKey: "userMail"
});
Idea.User = Idea.belongsTo(User,{
  foreignKey: "UserMail",
  targetKey: "userMail"
});

//synchronize schema (creates missing tables)
database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.error("Error with database synchronization: %s", err.message);
});