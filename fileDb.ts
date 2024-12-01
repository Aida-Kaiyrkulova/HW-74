import {promises as fs} from 'fs';
import {Message} from "./types";
import path from "path";

const messagesDir = path.join('./messages');
let data: Message[] = [];

const fileDb = {
    async init(){
        try {
            await fs.readdir(messagesDir);
        } catch (e) {
            console.error(e);
        }
    },
    async postMessages(message: Message){
        const filesPath = path.join(messagesDir,`${message.datetime}.txt`);
        const messageData = JSON.stringify(message);
        try {
            await fs.writeFile(filesPath, messageData);
            data.push(message);
            return message;
        } catch (e) {
            console.error(e);
        }
        },

};

export default fileDb;