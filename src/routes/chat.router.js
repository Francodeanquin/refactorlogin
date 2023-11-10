import { Router } from "express";
import { messageManager } from "../managers/messagesManager.js";

const router = Router();

router.post("/", async (req, res) => {
    const { fromUser, contentMessage, toUser } = req.body;
    if (!fromUser || !contentMessage || !toUser ) {
      return res.status(400).json({ message: "All data is required" });
    }
  
    try {
      const createMessage = await messageManager.createOne(req.body)
    //   res.status(200).json({ message: "Message Created", message: createMessage });      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/", async (req, res) => {
   
    try {
      const messages = await messageManager.findAll(req.query);
      res.status(200).json({ message: "messages",  messages });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.get('/:idMessage', async(req, res)=>{
    const {idMessage}= req.params
    try {
      const messageOne= await messageManager.findById(idMessage)
      res.status(200).json({ message: "message", messageOne });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  router.delete('/:idMessage', async(req, res)=>{
    const {idMessage}= req.params
    try {
      const deleteMessage= await messageManager.deleteOne(idMessage)
      res.status(200).json({ message: "Delete Message", deleteMessage });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  router.put('/:idMessage', async(req, res)=>{
    const {idMessage}= req.params
    const body=req.body
    try {
      const message= await messageManager.updateOne(idMessage, body)
      res.status(200).json({ message: "update Message", message });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
export default router;
