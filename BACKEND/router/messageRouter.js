import express from 'express';
import { sendMessage } from '../controller/messageController.js';


const router = express.Router();


router.post("/message/send" , sendMessage);


export default router;  