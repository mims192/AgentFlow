import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'

function MessageList() {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)
    const dispatch = useDispatch()
    return (
        <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {messages.length == 0 || !selectedConversation ? (
                <div className='h-full flex flex-col items-center justify-center gap-4 text-center'>
                    <div className='flex flex-col gap-1.5'>
                        <h1 className='text-[20px] font-semibold tracking-tight text-slate-200'>CortexAi</h1>
                        <p className='text-[15px] font-semibold tracking-tight text-slate-400'>How can I help you?</p>
                        <p className='text-[13px] font-semibold tracking-tight text-slate-600'>Ask me anything-code,ideas,explanation, or just a quick question.</p>
                    </div>
                </div>
            ) : (
                <div className='space-y-5'>

                    {messages?.map((msg, i) => {
                       return (
                       <div key={i}>
                            <MessageBubble role={msg?.role} content={msg?.content} images={msg?.images || []} />
                        </div>

                    )})}
                </div>
            )}
        </div>
    )
}

export default MessageList
