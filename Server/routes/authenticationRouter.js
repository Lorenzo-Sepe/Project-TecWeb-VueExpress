

import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import {saveUser} from "../middleware/AuthControllerPolicies.js";

export const authenticationRouter = express.Router();

/**
 * @swagger
 *  /auth:
 *    post:
 *      description: Authenticate user
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: user credentials to authenticate
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                usr:
 *                  type: string
 *                  example: Kyle
 *                pwd:
 *                  type: string
 *                  example: p4ssw0rd
 *      responses:
 *        200:
 *          description: User authenticated
 *        401:
 *          description: Invalid credentials
 */
authenticationRouter.post("/auth", async (req, res) => {
  let isAuthenticated = await AuthController.checkCredentials(req, res);
  if(isAuthenticated){
    console.log("User authenticated: ", req.body);
    res.json({token: AuthController.issueToken(req.body.email)});
  } else {
    res.status(401);
    res.json( {error: "Invalid credentials. Try again."});
  }
});

authenticationRouter.post("/signup", saveUser,  (req, res, next) => {
  saveUser(req, res, next);
  console.log('qui')
  AuthController.saveUser(req, res)
    .then(([ status, tokenObj ]) => {
      console.log('auth router, then', status,tokenObj)
      res.status(status).json(tokenObj)
    })
    .catch(e => console.error(e));
});

authenticationRouter.put("/editUser", (req, res, next) => {
  console.log("User updated: ", req.body);
  AuthController.updateUser(req).catch((err) => {
    next({status: 500, message: "Could not update user",error:err});
  })
});

   