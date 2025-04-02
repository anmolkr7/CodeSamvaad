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