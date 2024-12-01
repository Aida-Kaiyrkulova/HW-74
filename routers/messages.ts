import express from "express";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res) => {
    const messageText = req.body.message;
    const datetime = new Date().toISOString();
    const message = {
        message: messageText,
        datetime,
    };
 try {
     await fileDb.postMessages(message);
     res.send(message)
 } catch (e) {
     console.error(e);
 }
});

messagesRouter.get('/', (req, res) => {
res.send('List of posts');
});



export default messagesRouter;