import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createCommentModel } from "./Comment.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database);
createIdeaModel(database);
createCommentModel(database);

export const {User, Idea, Comment} = database.models;

//associations configuration
User.Ideas = User.hasMany(Idea,{
  foreignKey: "userMail",
  sourceKey: "userMail"
});
Idea.User = Idea.belongsTo(User,{
  foreignKey: "userMail",
  targetKey: "userMail"
});

Idea.Comment = Idea.hasMany(Comment,{
  foreignKey: "ideaId",
  sourceKey: "id"
});
Comment.Idea = Comment.belongsTo(Idea,{
  foreignKey: "ideaId",
  targetKey: "id"
});


//synchronize schema (creates missing tables)
database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.error("Error with database synchronization: %s", err.message);
});