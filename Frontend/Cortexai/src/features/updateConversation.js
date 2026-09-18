import api from "../../utils/axios"

export const updateConversation=async(payload)=>{
    try{
        const {data}=await api.post("/api/chat/update-message",payload)
        return data
    }
    catch(err){
        console.log(err)
        return []
    }
}