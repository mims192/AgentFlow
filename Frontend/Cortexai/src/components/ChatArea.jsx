import React from 'react'
import Navbar from './Navbar'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setArtifact, setMessages } from '../redux/messageSlice'

function ChatArea() {
        const {selectedConversation}=useSelector(state=>state.conversation)
        const dispatch = useDispatch()

    useEffect(()=>{
        const getMsg=async ()=>{
            if(selectedConversation){
            if(selectedConversation.title=="New Conversation") return;
            const data=await getMessages(selectedConversation?._id)
            dispatch(setMessages(data))
            const latestArtifacts=[...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
            dispatch(setArtifact(latestArtifacts?.artifacts || []))
            }
        }
        getMsg()
    },[selectedConversation?._id])
  return (
    <div className='flex-1 min-w-0  flex flex-col'>
      <Navbar/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
