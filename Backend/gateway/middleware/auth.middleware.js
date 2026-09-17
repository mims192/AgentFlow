import redis from "../../shared/redis.js"

const protect=async(req,res,next)=>{
    try{
        const sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(401).json({message:"Unauthorized"})
        }
        const session=await redis.get(`session:${sessionId}`) //the data of user we stored in redis as string
        if(!session){
            return res.status(401).json({message:"Expired session"})
        }
        req.user=JSON.parse(session)
        next()

    }

    catch(err){
        res.status(401).json({message:`Protected route error ${err.message}`})
    } 
}
export default protect
//req is an object.putting data here will be available in the next middleware or controller.
//now in any api we use this middleware, we can access the user data in req.user