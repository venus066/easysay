import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import User from '../../models/user.model.js';

export const registerUser = function (req, result) {
  User.create(req.body, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      let payloadData = {
        email: req.body.email,
        userId: resultOfQuery._id,
      };

      let access_token = jwt.sign({ payloadData }, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });
      let resultRegisterUser = {
        message: "User register successfully",
        access_token: access_token,
        user: {
          // displayName: resultOfQuery.displayName,
          // email: resultOfQuery.email,
          role: 'user',
          data: {
            displayName: resultOfQuery.displayName,
            photoURL: 'assets/images/avatars/Abbott.jpg',
            email: resultOfQuery.email,
            settings: {},
            shortcuts: []
          }
        }
      };
      result(null, resultRegisterUser);
    }
  });
};

export const resetPasswordLink = function (req, result, userId) {
  let payload = {
    email: req.body.email,
  };

  let token = jwt.sign({ payload }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  resetPassworSendMailLink(req, token, result, userId);
};

