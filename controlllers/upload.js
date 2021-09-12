const multer = require("multer");

const { getUser } = require("../models/user");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: async function (req, file, cb) {
    //  file.fieldname + "-" + Date.now()
    try {
      const { userId } = req.body;
      const filenamearr = file.originalname.split(".");
      const name = userId + "." + filenamearr[filenamearr.length - 1];
      cb(null, name);
    } catch (e) {
      cb(e);
    }
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = upload;
