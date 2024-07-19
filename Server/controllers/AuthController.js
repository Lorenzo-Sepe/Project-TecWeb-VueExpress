import { User,Idea } from "../models/Database.js";
import Jwt from "jsonwebtoken";


export class AuthController {

  /**
   * Handles post requests on /auth. Checks that the given credentials are valid
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  static async checkCredentials(req, res){
    let user = new User({ //user data specified in the request
      userName: req.body.user,
      userMail: req.body.email, 
      password: req.body.password
    });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        userMail: user.userMail,
        password: user.password //password was hashed when creating user
      }
    });

    return found !== null;
  }

  /**
   * 
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   * @returns 
   */
  static async saveUser(req, res){
    if (this.checkCredentials(req, res)){
      res.status(400).send({
        error:'Questo utente è già registrato.'
      });
      return;
    }
    //save new user
    try {
      let user = new User({
        userName: req.body.user, 
        userMail: req.body.email,
        password: req.body.password
      });
  
      res.status(200).send({
        token: AuthController.issueToken(user.userMail)
      });
      return user.save()
      //res.send({
      //  token: AuthController.issueToken(user.userMail)
      //});
      ; //returns a Promise
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error:'Questa email è già stata utilizzata per un altro account.'
      })
    }
   
  }

  /**
   * Crea un token per un utente e lo restituisce con scandeza di 24 ore
   * 
   * @param {string} userMail 
   * @returns 
   */
  static issueToken(userMail){
    return Jwt.sign({email:userMail}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
  }

  /**
   * Funzione che verifica se un token è valido
   * 
   * @param {*} token 
   * @param {*} callback 
   */
  static isTokenValid(token, callback){
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  /**
   * funzione che verifica se un utente può modificare un'idea
   * 
   * @param {*} user 
   * @param {*} ideaId 
   * @returns 
   */
  static async canUserModifyIdea(user, ideaId){
    const idea = await Idea.findByPk(ideaId);
    //idea must exist and be associated with user
    return idea && idea.userMail === user;
  }
}