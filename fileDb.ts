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
    async getMessages(){
       try {
           const files = await fs.readdir(messagesDir);

           const sortedFiles = files
               .map((file) => ({
                   file,
                   datetime: new Date(file.split('.')[0]),}))
               .sort((a, b) => b.datetime.getTime() - a.datetime.getTime());

           const lastMessages = sortedFiles.slice(0, 5);
           const messages: Message[] = [];

            for ( const {file } of lastMessages) {
                const filePath = path.join(messagesDir, file);
                const fileData = await fs.readFile(filePath);
                messages.push(JSON.parse(fileData.toString()));
            }
            return messages;
       } catch (e) {
           console.error(e);
       }
    }
};

export default fileDb;