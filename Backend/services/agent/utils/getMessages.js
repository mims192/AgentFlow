import axios from "axios"

export const getMessages=async(id)=>{
    try{
            const {data}=await axios.get(`${process.env.CHAT_SERVICE}/get-messages/${id}`)
            return data
    }
    catch(err){
        console.log(err)
    }
}