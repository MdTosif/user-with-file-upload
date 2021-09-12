const { addUser, getUser, editUser } = require("../models/user");

const fs = require("fs/promises");

exports.editUser = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const data = {};

    if (req.body.firstName) data.firstName = req.body.firstName;
    if (req.body.lastName) data.lastName = req.body.lastName;

    const modified = await editUser(userId, data);
    if (modified.matchedCount != 1 ) throw new Error('invalid userId/firstname/lastname');
    const fileLocation = "./public/images/" + userId + ".jpg";
    const fileurl = "./images/" + req.body.userId + ".jpg";
    await fs.access(fileLocation);
    res.json({
      msg: "Success!",
      imgPath: fileurl,
    });
  } catch (e) {
    if (e.code == "ENOENT") {
      res.json({
        msg: "Success!",
        imgPath: "",
      });
    } else {
      next(e);
    }
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const resdata = await addUser(userData);
    res.json(resdata);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const resdata = await getUser(userId);
    res.json(resdata);
  } catch (e) {
    next(e);
  }
};
