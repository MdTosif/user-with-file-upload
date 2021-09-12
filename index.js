const express = require("express");
const upload = require("./controlllers/upload");
const path = require("path");

const userController = require("./controlllers/user");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/user", userController.addUser);

app.get("/user/:userId", userController.getUser);

app.patch("/user", upload.single("image"), userController.editUser);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ msg:'Error!', error: err.message });
});

app.listen(process.env.PORT || 3000);
