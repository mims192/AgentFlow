import api from "../../utils/axios"

const getCurrentUser=async()=>{
    try{
        const {data}=await api.get("/api/current-user")
        return data
    }
    catch(err){
        console.error(err)
        return null
    }
}
export default getCurrentUser