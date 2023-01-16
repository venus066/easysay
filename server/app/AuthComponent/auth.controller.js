import * as authService from './auth.service.js'

export const loginUser = function (req, res) {
  authService.loginUser(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

export const registerUser = function (req, res) {
  authService.registerUser(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

export const resetPasswordLink = function (req, res) {
  authService.resetPasswordLink(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

export const updateUserPassword = function (req, res) {
  authService.updateUserPassword(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};
