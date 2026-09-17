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

        }
        }
    
)
export const {setConversation,addConversation,setSelectedConversation}=conversationSlice.actions
export default conversationSlice.reducer