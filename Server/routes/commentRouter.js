import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { Comment } from "../models/Database.js";
import { ensureUsersModifyOnlyOwnComments } from "../middleware/authorization.js";

export const commentRouter = new express.Router();

commentRouter.get("/comment/:id", (req, res, next) => {
  console.log("CommentRouter: ", req.params.id);
  CommentController.getCommentsForCurrentIdea(req).then(CommentItems => {
    console.log("Then CommentRouter: %o", JSON.stringify(CommentItems));
    res.json(CommentItems)
  }).catch(err => {
    next(err);
  });
});

/**
 * Funzione per salvare un commento
 
 */
commentRouter.post("/comment", (req, res) => {
    console.log("CommentRouter: ", req.body);
  CommentController.saveComment(req, res)
  .then(([ status, message ]) => res.status(status).json(message))
  .catch(e => console.error(e));  
});

/**
 * Funzione di test per riempiree rapidamente il  database
 */
commentRouter.post("/fillDatabase",(req,res)=>{
    CommentController.fillDatabase(req,res)
    .then(({status,message}) => res.status(status).json(message))
    .catch(e => console.error(e));
  }
)

commentRouter.delete("/comment/:id",  ensureUsersModifyOnlyOwnComments,async (req, res, next) => {
  try {
    const Comment = await CommentController.delete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

commentRouter.put("/Comment/:id", ensureUsersModifyOnlyOwnComments, (req, res, next) => {
  CommentController.update(req.params.id, req.body).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Comment not found"});
  }).catch( err => {
    next(err);
  })
});

commentRouter.put("/Comment/:id/vote", (req, res, next) => {
  CommentController.update(req.params.id, req.body)
  .then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Comment not found"});
  }).catch( err => {
    next(err);
  })
});