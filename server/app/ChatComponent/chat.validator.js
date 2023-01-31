import yup from 'yup';
import jwt from 'jsonwebtoken';
import * as chatController from './chat.controller.js';

export const getUser = async function (req, res) {
  try {
    console.log('req.headers.authorization: ', req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const { userInfo } = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log('userInfo: ', userInfo.email);
    req.body.email = userInfo.email;
    chatController.getUser(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};

export const getContact = async function (req, res) {
  try {
    chatController.getContact(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};

export const getChat = async function (req, res) {
  try {
    chatController.getChat(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};

