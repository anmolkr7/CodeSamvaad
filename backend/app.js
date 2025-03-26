import express from 'express'
import connect from './db/db.js';
import userRoutes from './routes/userRoutes.js'


const app=express()
connect();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)
app.get('/',(req,res)=>{
    res.send("Hello world")
})

export default app;