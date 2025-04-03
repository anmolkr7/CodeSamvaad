import mongoose from "mongoose";
import projectModel from "../models/projectModel.js";

export const createProject=async({
    name,userId
})=>{
    if(!name || !userId)
        throw new Error("Name and userId are required")
    let project;
    try{
        project=await projectModel.create({
        name,
        users:[userId]
        })
    }
    catch(err){
        if(err.code===11000)
            throw new Error("Project already exists")
        throw new Error(err.message)
    }
    return project;
}

export const getAllProjectByUserId=async({userId})=>{
    if(!userId)
        throw new Error("UserId is required")
    const allUserProjects=await projectModel.find({
        users:userId
    })
    return allUserProjects
}

export const addUsersToProject=async({projectId,users,userId})=>{
    if(!projectId || !users || users.length===0)
        throw new Error("ProjectId and users are required")
    if(!mongoose.Types.ObjectId.isValid(projectId))
        throw new Error("Invalid ProjectId")
    if(!Array.isArray(users)||users.some(userId=>
    !mongoose.Types.ObjectId.isValid(userId)))
        throw new Error("Invalid UserId in users array")
    if(!userId)
        throw new Error("UserId is required")
    if(!mongoose.Types.ObjectId.isValid(userId))
        throw new Error("Invalid UserId")

    const project=await projectModel.findOne({
        _id:projectId,
        users:userId
    })
    if(!project)
        throw new Error("No such Project found")
    const updatedProject=await projectModel.findByIdAndUpdate(projectId,{
        $addToSet:{
            users:{$each:users}
        }
    },{new:true})
    return updatedProject
}