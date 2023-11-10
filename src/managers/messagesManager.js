import { messageModel } from "../db/models/message.models.js";
import BasicManager from "./basicManager.js";

class MessagesManager  extends BasicManager  {
   constructor(){
    super(messageModel)
   }
};

export const messageManager = new MessagesManager()