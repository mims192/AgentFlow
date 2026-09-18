import { searchtool } from "../config/tavily.js"

export const searchAgent=async(state)=>{
    try{
        const results=await searchtool.invoke({
            query:state.prompt
        })
        return {
            ...state,
            searchResults:results,
            images:results.images
        }
    }
    catch(err){
         return {
            ...state,
            searchResults:[],
            images:[]
        }
    }
}