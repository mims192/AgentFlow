import redis from "../../../shared/redis.js"
import { getMessages } from "../utils/getMessages.js"

export const getMemory=async(cid)=>{
   const key=`messages-${cid}`
   const cached=await redis.get(key)
   if(cached){
    return JSON.parse(cached)
   }
   const messages=await getMessages(cid);
   await redis.set(key,JSON.stringify(messages),"EX",24*60*60)

   return messages

}

export const addMessages=async(cid,role,content)=>{
    const key=`messages-${cid}`
    const rawMessages=await redis.get(key);
    const messages=rawMessages?JSON.parse(rawMessages):[]
    messages.push({
        role,content
    })
    if(messages.length>20){
        messages.shift()
    }
    await redis.set(key,JSON.stringify(messages))
}