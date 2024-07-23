import {Idea} from "../models/Database.js";
import {User} from "../models/Database.js";
export class IdeaController {
  
  static async getIdeasAll(){
    return Idea.findAll()
  }

  static async getIdeasForCurrentUser(req){
    console.log("QUI userMail:",req.userMail)
    return Idea.findAll({
      where: {
        userMail: req.userMail
      }
    })
  }
  
  /*static async saveIdea(req){
    let Idea = Idea.build(req.body);
    Idea.UserMail = req.email;
    return Idea.save();
  }*/

  static async saveIdea(req, res){
    const user = await User.findByPk(req.userMail);

    if(!user){
      res.status(404).json({message: "User not found"});
      return;
    }

    //save new idea
    
    return new Promise( (ok,fail)=>{
      console.log("User:", user.userMail);
      Idea.create({
        title: req.body.title, 
        content: req.body.content,
        UserMail: user.userMail
      })
      .then(idea => ok([200 , {message: "Idea saved"}]))
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
      Idea.create({
        title: req.body.title, 
        content: req.body.content,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        UserMail: user.userMail
      })
      .then(idea => ok([200 , {message: "Idea saved: " , idea}]))
      .catch(e=>{
        console.log("Errore nel creazione idee:", e);
        fail(e);
      })
    })
  }

  static async findById(req){
    return Idea.findByPk(req.params.id);
  }

  static async update(id, updated){
    let ideaUpdated = await Idea.findByPk(id);
    ideaUpdated.set(updated); //update using fields which were passed in request
    return ideaUpdated.save();
  }

  static async delete(ideaId){
    let idea = await Idea.findByPk(ideaId);
    return idea.destroy();
  }
    
}

