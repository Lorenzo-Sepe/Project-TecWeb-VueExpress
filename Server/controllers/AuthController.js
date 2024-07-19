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
   * Attempts to create a new User
   */
  static async saveUser(req, res){
    //save new user
    try {
      let user = new User({
        userName: req.body.user, 
        userMail: req.body.email,
        password: req.body.password
      });
      res.send(user.toJSON)
      return user.save(); //returns a Promise
    } catch (error) {
      res.status(400).send({
        error:'Questa email è già stata utilizzata per un altro account.'
      })
    }
   
  }

  static issueToken(username){
    return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
  }

  static isTokenValid(token, callback){
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  static async canUserModifyIdea(user, ideaId){
    const idea = await Idea.findByPk(ideaId);
    //idea must exist and be associated with user
    return idea && idea.userMail === user;
  }
}