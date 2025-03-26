import userModel from '../models/userModel.js';
import * as userService from '../services/userService.js'
import { body, validationResult } from 'express-validator';
export const createUserController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
        
    }
    try{
        const user=await userService.createUser(req.body)
        const token = await user.generateJWT();

       // delete user._doc.password;

        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}