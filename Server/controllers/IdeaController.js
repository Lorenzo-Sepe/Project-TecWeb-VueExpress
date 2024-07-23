import {Idea} from "../models/Database.js";
import {User} from "../models/Database.js";
export class IdeaController {
  
  static async getIdeasAll(){
    return Idea.findAll()
  }

  static async getIdeasForCurrentUser(req){
    return Idea.findAll({
      where: {
        UserMail: req.email
      }
    })
  }
  
  /*static async saveIdea(req){
    let Idea = Idea.build(req.body);
    Idea.UserMail = req.email;
    return Idea.save();
  }*/

  static async saveIdea(req, res){
    const user = await User.findByPk(req.body.userMail);

    if(!user){
      res.status(404).json({message: "User not found"});
      return;
    }

    //save new idea
    
    return new Promise( (ok,fail)=>{
      console.log("req.body:", req.userMail);
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
    let Idea = await Idea.findByPk(id);
    Idea.set(updated); //update using fields which were passed in request
    return Idea.save();
  }

  static async delete(req){
    return new Promise( (resolve, reject) => {
      this.findById(req).then( item => {
        item.destroy().then( () => {resolve(item)})
      })
    })
  }
}