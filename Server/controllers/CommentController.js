import { json } from "sequelize";
import {Comment} from "../models/Database.js";
import {User} from "../models/Database.js";

export class CommentController {
    
    static async getCommentsForCurrentIdea(req){
    return Comment.findAll({
      where: {
        ideaId: req.params.id
      }
    })
  }

  /**
   *  static async getIdeasForCurrentUser(req){
    return Idea.findAll({
      where: {
        userMail: req.userMail
      }
    })
  }
   */
  
  static async saveComment(req, res){
    console.log("CommentRouter: ", req.userMail);
    const user = await User.findByPk(req.userMail);

    if(!user){
      res.status(404).json({message: "User not found"});
      return;
    }

    //save new idea
    return new Promise( (ok,fail)=>{
        //console.log("Utente:", req.body);
      //console.log("Utente:", user.userMail);
      Comment.create({
        content: req.body.content,
        userMail: user.userMail,
        ideaId: req.body.ideaId
      })
      .then(comment => ok([200 , {message: "Comment saved"}]))
      .catch(e=>{
        fail(e);
      })
    })
  }

  /**
   * Funzione di supoorto per riempire il database velocemente
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static async fillDatabase(req,res){
    const user = await User.findByPk(req.body.userMail);

    if(!user){
      res.status(404).json({message: "User not found"});
      return;
    }

    return new Promise( (ok,fail)=>{
      console.log("req.body.userMail:", req.body.userMail,);
      Comment.create({
        ideaId: req.body.ideaId,
        content: req.body.content,
        UserMail: req.body.userMai
      })
      .then(comment => ok([200 , {message: "Comment saved: " , comment}]))
      .catch(e=>{
        console.log("Errore nel creazione commento:", e);
        fail(e);
      })
    })
  }

  static async findById(req){
    return Comment.findByPk(req.params.id);
  }

  static async update(id, updated){
    let commentUpdated = await Comment.findByPk(id);
    console.log("info Updated:", updated);
    commentUpdated.set(updated); //update using fields which were passed in request
    return commentUpdated.save();
  }

  static async delete(ideaId){
    let comment = await Comment.findByPk(ideaId);
    return comment.destroy();
  }
    
}

