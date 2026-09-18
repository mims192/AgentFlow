import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice (
    {
        name: "conversation",
        initialState: {
            conversations: [],   
            selectedConversation:null
        },
        reducers: {
            setConversation:(state,action)=>{
                state.conversations=action.payload //used when we get all conversation and we put in the array 
            },
            addConversation:(state,action)=>{
                state.conversations.unshift(action.payload) //use this reducer when we have to just add the created conversation 
                //unshift adds elements at the start of the array
            },
            setSelectedConversation:(state,action)=>{
                state.selectedConversation=action.payload //used when we get all conversation and we put in the array 
            },
            setConvTitle:(state,action)=>{
                 const {title,conversationId}=action.payload
                 state.conversations=state.conversations.map((conv)=>(
                    conv._id==conversationId?(
                        {...conv,title} // here key value same so title hi rhne diya otherwise {...conv,title:titles} puri conv same just update title
                    ):conv
                 ))

                 if(state.selectedConversation?._id==conversationId){
                    state.selectedConversation={...state.selectedConversation,title}
                 }
            },


        }
        }
    
)
export const {setConversation,addConversation,setSelectedConversation,setConvTitle}=conversationSlice.actions
export default conversationSlice.reducer