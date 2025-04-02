import express from 'express'
import connect from './db/db.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express()
connect();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use('/users',userRoutes)

export default app; 