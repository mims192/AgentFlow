import api from "../../utils/axios"

const getMessages=async(id)=>{
    try{
        const {data}=await api.get(`/api/chat/get-messages/${id}`)
        return data
    }
    catch(err){
        console.error(err)
        return []
    }
}

export default getMessages
