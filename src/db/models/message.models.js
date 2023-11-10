import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const messageSchema = new Schema({
    fromUser: {
        type: String,
        required: true,
    },
    contentMessage: {
        type: String,
        required: true,
    },
    toUser: {
        type: String,
        required: true,
    },
   
});

messageSchema.plugin(mongoosePaginate)

export const messageModel= model('Messages', messageSchema) 

