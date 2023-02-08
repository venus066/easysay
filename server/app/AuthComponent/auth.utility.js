import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import User from '../../models/user.model.js';

export const registerUser = function (req, result) {
  User.create(req.body, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      let userInfo = {
        email: req.body.email,
        userId: resultOfQuery._id,
      };
      //   console.log(resultOfQuery);
      let access_token = jwt.sign({ userInfo }, process.env.PRIVATE_KEY, {
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

async function resetPassworSendMailLink(req, token, result, userId) {
  let transporter = nodemailer.createTransport({
    service: process.env.EAMIL_SERVICE,
    auth: {
      user: process.env.ADMIN_EMAIL_ADDRESS,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
    proxy: 'http://ptc2:ptc2023!@192.168.104.20:808'
  });

  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL_ADDRESS, // sender mail id
      to: req.body.email, // Receiver mail id
      subject: "Reset Password Link", // Subject of mail
      text: `Reset Password Link '${process.env.REACT_APP_BACKEND_URL}/set-new-password?${token}?${userId}`, // text body
    });

    let resultResetPasswordLink = {
      message: "Reset password link send!",
      userId: userId,
    };
    result(null, resultResetPasswordLink);
  } catch (e) {
    console.log(e);
    let resultResetPasswordLink = { message: "Something went wrong!" };
    result(null, resultResetPasswordLink);
  }
}

export const findUpdateUserPassword = function (req, result) {
  let password = (req.body.password = bcrypt.hashSync(req.body.password, 10));
  User.findByIdAndUpdate(
    req.body.userId,
    { password: password },
    function (error, resultOfQuery) {
      if (error) {
        console.log(error);
        result(error, null);
      } else {
        if (resultOfQuery === null) {
          let resultUpdateUserPassword = { message: "User not found!" };
          result(null, resultUpdateUserPassword);
        } else {
          let resultUpdateUserPassword = {
            message: "Password Updated Successfully!",
          };
          result(null, resultUpdateUserPassword);
        }
      }
    }
  );
};
