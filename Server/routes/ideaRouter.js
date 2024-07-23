import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";
import { Idea } from "../models/Database.js";

export const ideaRouter = new express.Router();

ideaRouter.get("/idea", (req, res, next) => {
  IdeaController.getIdeasForCurrentUser(req).then(ideaItems => {
    res.json(ideaItems)
  }).catch(err => {
    next(err);
  });
});

ideaRouter.get("/idea/all",(req,res)=>{
  IdeaController.getIdeasAll(req,res)
  .then(ideaItems =>{
    res.json(ideaItems)
  }).catch(err => {
    next(err);
  });
})

ideaRouter.get("/ideaUser",(req,res,next)=>{
  IdeaController.getIdeasForCurrentUser(req,res)
  .then(ideaItems =>{
    console.log("Qui Then")
    res.json(ideaItems)
  }).catch(err => {
    console.log("Qui catch")
    console.log(req.userMail)
    console.log(err)
    next(err);
  });
})

ideaRouter.post("/idea", (req, res) => {
  IdeaController.saveIdea(req, res)
  .then(([ status, message ]) => res.status(status).json(message))
  .catch(e => console.error(e));  
});

/**
 * Funzione di test per riempiree rapidamente il  database
 */
ideaRouter.post("/fillDatabase",(req,res)=>{
    IdeaController.fillDatabase(req,res)
    .then(({status,message}) => res.status(status).json(message))
    .catch(e => console.error(e));
  }
)

ideaRouter.get("/idea/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "idea not found"});
  }).catch( err => {
    next(err);
  })
});

ideaRouter.delete("/ideas/:id",  ensureUsersModifyOnlyOwnIdeas,async (req, res, next) => {
  try {
    const idea = await IdeaController.delete(req.params.id);
    res.json({ message: "Idea deleted" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

ideaRouter.put("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.update(req.params.id, req.body).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "idea not found"});
  }).catch( err => {
    next(err);
  })

 
});