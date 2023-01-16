import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authUtility from './auth.utility.js';
import User from '../../models/user.model.js';

export const loginUser = function (req, result) {
  User.findOne({ email: req.body.email }, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      if (resultOfQuery === null) {
        let resultLoginUser = { message: "User Not Found" };
        result(null, resultLoginUser);
      } else {
        if (bcrypt.compareSync(req.body.password, resultOfQuery.password)) {
          let payloadData = {
            email: req.body.email,
            userId: resultOfQuery._id,
          };

          let token = jwt.sign({ payloadData }, process.env.PRIVATE_KEY, {
            expiresIn: "1d",
            algorithm: "HS256",
          });

          let resultLoginUser = {
            message: "User Login Successfully",
            token: token,
            displayName: resultOfQuery.displayName,
            userId: resultOfQuery._id,
          };
          result(null, resultLoginUser);
        } else {
          let resultLoginUser = { message: "Wrong Password" };
          result(null, resultLoginUser);
        }
      }
    }
  });
};

export const registerUser = function (req, result) {
  User.findOne({ email: req.body.email }, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      //   console.log(resultOfQuery);
      if (resultOfQuery === null) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        authUtility.registerUser(req, result);
      } else {
        let resultRegisterUser = { message: "User Already registered" };
        result(null, resultRegisterUser);
      }
    }
  });
};

export const resetPasswordLink = function (req, result) {
  User.findOne({ email: req.body.email }, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      if (resultOfQuery === null) {
        let resultLoginUser = { message: "User Not Found" };
        result(null, resultLoginUser);
      } else {
        authUtility.resetPasswordLink(req, result, resultOfQuery._id);
      }
    }
  });
}

export const updateUserPassword = function (req, result) {
  let tokenStartLength = req.headers.referer.indexOf("?");
  let tokenLastLength = req.headers.referer.lastIndexOf("?");
  let token = req.headers.referer.substring(
    tokenStartLength + 1,
    tokenLastLength
  );
  req.body.userId = req.headers.referer.substring(tokenLastLength + 1);

  jwt.verify(token, process.env.PRIVATE_KEY, function (error, decoded) {
    if (error) {
      result(error, null);
    } else {
      req.decoded = decoded;
      req.authenticated = true;
      authUtility.findUpdateUserPassword(req, result);
    }
  });
};
