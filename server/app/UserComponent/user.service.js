const User = require("../../models/user.model");

exports.getUserProfileById = async function (req, result) {
  User.findById(
    req.body.userId,
    { password: false, updatedAt: false, createdAt: false },
    function (error, resultOfQuery) {
      if (error) {
        result(error, null);
      } else {
        if (resultOfQuery === null) {
          let resultGetUser = { message: "User not found!" };
          result(null, resultGetUser);
        } else {
          result(null, resultOfQuery);
        }
      }
    }
  );
};

exports.updateUserProfile = function (req, result) {
  User.findByIdAndUpdate(
    req.body.userId,
    req.body.userProfileData,
    function (error, resultOfQuery) {
      if (error) {
        console.log(error);
        result(error, null);
      } else {
        if (resultOfQuery === null) {
          let resultUpdateUserProfile = { message: "User not found!" };
          result(null, resultUpdateUserProfile);
        } else {
          let resultUpdateUserProfile = {
            message: "Profile Updated Successfully!",
          };
          result(null, resultUpdateUserProfile);
        }
      }
    }
  );
};

exports.deleteUserProfile = function (req, result) {
  User.findOneAndDelete(
    { _id: req.params.userId },
    function (error, resultOfQuery) {
      if (error) {
        result(error, null);
      } else {
        if (resultOfQuery === null) {
          let resultDeleteUser = { message: "User not found!" };
          result(null, resultDeleteUser);
        } else {
          let resultDeleteUser = {
            message: "User Account Deleted Successfully!",
          };
          result(null, resultDeleteUser);
        }
      }
    }
  );
};
