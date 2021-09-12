const mongoose = require("./db");

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const userModel = mongoose.model("User", userSchema);

const addUser = async (data) => {
  const { userId, firstName, lastName } = data;
  const newUser = new userModel({ userId, firstName, lastName });
  await newUser.save();
  console.log(newUser);
  return newUser;
};

const getUser = async (userId) => {
  const userCollection = await userModel.findOne({ userId }).lean();
  if (!userCollection) throw new Error("userId doesn't exist");
  console.log(userCollection);
  return userCollection;
};

const editUser = async (userId, data) => {
  const userCollection = await userModel.updateOne({ userId }, data).lean();
  if (!userCollection) throw new Error("userId doesn't exist");
  console.log(userCollection);
  return userCollection;
};

// editUser(32, {
//   firstName: "oo",
// });

// getUser(32);

module.exports = {
  addUser,
  getUser,
  userModel,
  editUser,
};
