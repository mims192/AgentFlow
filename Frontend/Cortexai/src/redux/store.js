import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice.js';
import conversationReducer from './conversationSlice.js'
import messageReducer from './messageSlice.js';

export const store = configureStore({
  reducer: {
    user: useReducer, 
    conversation:conversationReducer, //now we can access conversation using useselector
    message:messageReducer
  },
})