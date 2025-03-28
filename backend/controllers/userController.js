import userModel from '../models/userModel.js';
import * as userService from '../services/userService.js'
import { body, validationResult } from 'express-validator';
import redis from '../services/redisService.js';
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

export const loginController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email}).select('+password')
        if(!user)
        {
            return res.status(401).json({
                errors:'Invalid Credentials'
            })
        }
        const isMatch=await user.isValidPassword(password)
        if(!isMatch)
        {
            return res.status(401).json({
                errors:'Invalid password'
            })
        }
        const token=await user.generateJWT();
        res.status(200).json({user,token})

    }
    catch(err){
        res.status(400).send(err.message)
    }
}

export const profileController=async(req,res)=>{
    console.log(req.user)
    res.status(200).json({
        user:req.user
    })
}

export const logoutController=async(req,res)=>{
    try
    {
        const token=req.cookies.token || req.headers.authorization.split(" ")[1];
        await redis.set(token,'logout','EX',60*60*24*7) // 7 days
        res.status(200).json({
            message:'Logout successful'
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }   
}