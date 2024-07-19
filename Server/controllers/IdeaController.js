import {Idea} from "../models/Database.js";

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
    //save new idea
    try {
      let idea = new Idea({
        title: req.body.title, 
        content: req.body.content,
        userMail: req.body.email
      });
      res.status(200).send({
        message: 'Idea salvata con successo'
      });
      return idea.save(); //returns a Promise
    } catch (error) {
      res.status(500).send({
        error:'Non è stato possibile salvare la tua idea'
      })
    }
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