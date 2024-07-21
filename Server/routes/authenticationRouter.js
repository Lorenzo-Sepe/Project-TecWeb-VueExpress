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
    res.json(AuthController.issueToken(req.body.usr));
  } else {
    res.status(401);
    res.json( {error: "Invalid credentials. Try again."});
  }
});

authenticationRouter.post("/signup", saveUser,(req, res, next) => {
  saveUser(req, res, next);
  AuthController.saveUser(req, res).catch((err) => {
    next({status: 500, message: "Could not save user",error:err});
  })
});

authenticationRouter.put("/editUser", (req, res, next) => {
  AuthController.updateUser(req).catch((err) => {
    next({status: 500, message: "Could not update user",error:err});
  })
});