import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
    const {selectedConversation}=useSelector(state=>state.conversation)
        const {messages}=useSelector(state=>state.message)

  return (
      <>
    {selectedConversation && 
      
    <div className='h-14 flex items-center gap-3.5 px-5 border-b border-white/[0.06] bg-[#0d0f14]'>
      <div className='flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 '>
        <MessageSquare size={15} className='text-indigo-400'/>
        </div>
        <div className='text-[14px] font-semibold text-slate-100 tracking-tight'>
            {selectedConversation?.title || "New Chat"}
            </div>

        <div className='text-[10x] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full'>
            {messages.length} Message
        </div>
    </div>
   
    }
     </>
  )
}

export default Navbar
