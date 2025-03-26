import express from 'express'
import connect from './db/db.js';

connect();
const app=express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello world")
})

export default app;