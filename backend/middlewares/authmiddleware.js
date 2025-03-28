import jwt from "jsonwebtoken";
import redis from "../services/redisService.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({error:'Unauthorized User'});
    }
    const isBlacklisted = await redis.get(token);  //since .get is async function, we need to await it
    if(isBlacklisted){
      res.cookie('token','');
      return res.status(401).send({error:'Unauthorized User'});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (error)
  {
    res.status(401).send({error:'Unauthorized User'});
  }
}