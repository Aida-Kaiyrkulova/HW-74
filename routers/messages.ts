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
        res.send(message);
    } catch (e) {
        console.error(e);
    }
});

messagesRouter.get('/', async (req, res) => {
    try {
        const messages = await fileDb.getMessages();
        res.send(messages);
    } catch (e) {
        console.error(e);
    }
});

export default messagesRouter;