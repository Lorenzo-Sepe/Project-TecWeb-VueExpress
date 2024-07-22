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
  static async saveUser(req) {
    //save new user
    return new Promise((ok, fail) => {
      User.create({
        userName: req.body.user, 
        userMail: req.body.email,
        password: req.body.password
      })
      .then(user => ok([ 200,  { token: AuthController.issueToken(user.userMail) } ]))
      .catch(e => {
        if(Boolean( e.errors)) {
          const foundUniqueViolation = e.errors.find(e => e.type === 'unique violation');
  
          if(foundUniqueViolation) {
            ok([ 409, {message: `L'utente ${foundUniqueViolation.value} già esiste.`}])
          }
        }
        else
          fail(e);
      });
    })
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

  static updateUser(req, res){
    User.update({
      userName: req.body.userName,
      password: req.body.password,
      votedOn: req.body.votedOn
    },{
      where: {
        userMail: req.body.userMail
      }
    }).then((user) => {
      res.status(200).send({
        token: AuthController.issueToken(req.body.userMail)
      });
    }).catch((err) => {
      res.status(500).send({
        error: "Could not update user",
        details: err
      });
    });
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