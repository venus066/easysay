const yup = require("yup");

const userController = require("./user.controller");

exports.getUserProfileById = async function (req, res) {
  const data = req.body;
  try {
    const schema = yup.object({
      userId: yup.string().min(1).max(50).required(),
    });
    await schema.validate(data);
    userController.getUserProfileById(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};

exports.updateUserProfile = async function (req, res) {
  const data = req.body.userProfileData;
  try {
    const schema = yup.object({
      phoneNumber: yup.number(),
      displayName: yup.string().min(3).max(50),
    });
    await schema.validate(data);

    userController.updateUserProfile(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};

exports.deleteUserProfile = async function (req, res) {
  const data = req.params;
  try {
    const schema = yup.object({
      userId: yup.string().min(1).max(50).required(),
    });
    await schema.validate(data);
    userController.deleteUserProfile(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: "Bad Request", message: e.message });
  }
};
