import * as chatService from './chat.service.js'

export const getUser = function (req, res) {
  chatService.getUser(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

export const getContact = function (req, res) {
  chatService.getContact(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

export const getChat = function (req, res) {
  chatService.getChat(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};