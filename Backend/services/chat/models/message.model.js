import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    conversationId:{ //ek conversation mai multiple messages 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    role:{
        type:String,
        enum:["user","assistant"],
    },
    content:String,
    images:[String]
},{
    timestamps:true
}

)

 const Message=mongoose.model("Message",messageSchema)
 export default Message