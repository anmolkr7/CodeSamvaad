import Redis from "ioredis";

const redis=new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,    
    password:process.env.REDIS_PASSWORD
}); 
redis.on('connect',()=>{
    console.log("Redis connected")  
})
redis.on('error',()=>{
    console.log("Redis connection error")
})    
export default redis;