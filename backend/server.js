import dotenv from 'dotenv'
dotenv.config()
import app from "./app.js";
import http from 'http'
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import projectModel from './models/projectModel.js'
import { generateResult } from './services/aiService.js';

const port=process.env.PORT || 8080;
const server=http.createServer(app);

const io =new Server(server,{
    cors:{
        origin: 'https://codesamvaad-frontend.onrender.com',
        credentials: true
    }
})

io.use(async (socket,next)=>{
    try{
        const token=socket.handshake.auth?.token ||socket.handshake.headers.authorization?.split(" ")[1]
        const projectId=socket.handshake.query.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error("Invalid project id"))
        }
        
        socket.project=await projectModel.findById(projectId)

        if(!token){
            return next(new Error("Authentication error"))
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return next(new Error("Authentication error"))
        }
        socket.user=decoded;
        next()
    }
    catch(err){
        next(err)
    }   
})

io.on('connection', socket => {
    socket.roomId=socket.project._id.toString()
    console.log('a user connected');

    socket.join(socket.roomId)

    socket.on('project-message', async (data) => {
        const message=data.message
        const aiIsPresentInMessage=message.includes('@ai')
        socket.broadcast.to(socket.roomId).emit('project-message', data);
        if(aiIsPresentInMessage){
            const prompt=message.replace('@ai','');
            const result=await generateResult(prompt)
            io.to(socket.roomId).emit('project-message', {
                message:result,
                sender:{
                    _id:'ai',
                    email:'AI'   
                }
            })
        }
        console.log(data)
        
    }); 

    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.roomId)
    });
});


server.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`)
})