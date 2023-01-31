import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authUtility from './auth.utility.js';
import User from '../../models/user.model.js';

export const loginUser = function (req, result) {
  console.log('req.body.email', req.body.email);
  User.findOne({ email: req.body.email }, function (error, resultOfQuery) {
    if (error) {
      result(error, null);
    } else {
      if (resultOfQuery === null) {
        let resultLoginUser = { message: "User Not Found" };
        result(null, resultLoginUser);
      } else {
        if (bcrypt.compareSync(req.body.password, resultOfQuery.password)) {
          let userInfo = {
            email: req.body.email,
            id: resultOfQuery._id,
          };

          let access_token = jwt.sign({ userInfo }, process.env.PRIVATE_KEY, {
            expiresIn: "1d",
            algorithm: "HS256",
          });

          let user = {
            userInfo: {
              displayName: resultOfQuery.displayName,
              email: req.body.email,
              id: resultOfQuery._id,
              role: resultOfQuery.role,
              redirectUrl: '/'
            },
            access_token,
            message: "User Login Successfully",
          };
          result(null, user);
        } else {
          let user = { message: "Wrong Password" };
          result(null, user);
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
      if (resultOfQuery === null) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.role = 'user';
        authUtility.registerUser(req, result);
      } else {
        let resultRegisterUser = { message: "User Already registered" };
        result(null, resultRegisterUser);
      }
    }
  });
};

export const accessToken = function (req, result) {
  const { data } = req.body;
  const { userInfo } = jwt.verify(data.access_token, process.env.PRIVATE_KEY);
  User.findById(userInfo.id, function (error, user) {
    if (error) {
      result(error, null);
    } else {
      if (user) {
        delete user.password;

        let userInfo = {
          displayName: user.displayName,
          email: user.email,
          id: user._id,
          role: user.role,
          redirectUrl: '/'
        };

        let updatedAccessToken = jwt.sign({ userInfo }, process.env.PRIVATE_KEY, {
          expiresIn: "1d",
          algorithm: "HS256",
        });

        const response = {
          userInfo,
          access_token: updatedAccessToken
        };

        result(null, response);
      } else {
        result(error, null);
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
