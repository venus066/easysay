import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.model.js';

export const getUser = function (req, result) {
  console.log(req.body.email)
  User.findOne({ email: req.body.email }, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      if (resultOfQuery === null) {
        let userInfo = { message: "User Not Found" };
        result(null, userInfo);
      } else {
        let userInfo = {
          id: resultOfQuery._id,
          name: resultOfQuery.displayName,
          avatar: 'assets/images/avatars/ai.png',
          status: 'online',
          mood: "it's a status....not your diary...",
          chatList: [
          ]
        };
        result(null, userInfo);
      }
    }
  });
};

export const getContact = function (req, result) {
  const contact = [{
    id: '5725a680b3249760ea21de52',
    name: 'AI Assistant',
    avatar: 'assets/images/avatars/ai.png',
    status: 'online',
    mood: 'Have a good day',
  }];
  result(null, contact);
};

export const getChat = function (req, result) {
  const chat = {
    id: '1725a680b3249760ea21de52',
    dialog: []
  };
  const userChatList = [{
    chatId: '1725a680b3249760ea21de52',
    contactId: '5725a680b3249760ea21de52',
    lastMessageTime: '2021-06-12T02:10:18.931Z'
  }];
  result(null, {chat, userChatList});
};
