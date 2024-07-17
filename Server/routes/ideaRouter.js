import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();

ideaRouter.get("/idea", (req, res, next) => {
  IdeaController.getIdeasForCurrentUser(req).then(ideaItems => {
    res.json(ideaItems)
  }).catch(err => {
    next(err);
  });
});

ideaRouter.post("/idea", (req, res, next) => {
  IdeaController.saveidea(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

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

ideaRouter.delete("/ideas/:id", ensureUsersModifyOnlyOwnideas, (req, res, next) => {
  IdeaController.delete(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "idea not found"});
  }).catch( err => {
    next(err);
  })
});


ideaRouter.put("/ideas/:id", ensureUsersModifyOnlyOwnideas, (req, res, next) => {
  IdeaController.update(req.params.id, req.body).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "idea not found"});
  }).catch( err => {
    next(err);
  })
});