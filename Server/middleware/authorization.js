import { AuthController } from "../controllers/AuthController.js";

/**
 * This middleware ensures that the user is currently authenticated. If not,
 * redirects to login with an error message.
 */
export const enforceAuthentication = (excludeRoutes = []) => (req, res, next) => {
  if(excludeRoutes.map(r => new RegExp(r)).some(r => r.test(req.path))) {
    return; // ignore authentication on these paths
  }
  
  const authHeader = req.headers['authorization']
  if(!authHeader){
    res.status(401).send({message:"Unauthorized, Il token non è stato fornito"});

    return;
  }
  AuthController.isTokenValid(authHeader, (err, decodedToken) => {
    if(err){
      res.status(401).send({message:"Unauthorized, il token non è valido"});
      return
    } else {
      req.userMail = decodedToken.email;
      
      next();
    }
  });
}

export async function ensureUsersModifyOnlyOwnIdeas(req, res, next){
  const user = req.email;
  const ideaId = req.params.id;
  const userHasPermission = await AuthController.canUserModifyIdea(user, ideaId);
  if(userHasPermission){
    next();
  } else {
    next({
      status: 403, 
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }
}