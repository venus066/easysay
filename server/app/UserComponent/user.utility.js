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
