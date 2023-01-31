import express from 'express';
import * as chatValidator from '../app/ChatComponent/chat.validator.js';
const router = express.Router();

router.post("/user", chatValidator.getUser);
router.post("/contacts", chatValidator.getContact);
router.post("/get-chat", chatValidator.getChat);

export default router
