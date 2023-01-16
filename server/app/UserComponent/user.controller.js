const userService = require("./user.service");

exports.getUserProfileById = function (req, res) {
  userService.getUserProfileById(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.updateUserProfile = function (req, res) {
  userService.updateUserProfile(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.deleteUserProfile = function (req, res) {
  userService.deleteUserProfile(req, function (error, result) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};
