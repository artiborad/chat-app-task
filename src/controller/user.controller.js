
const users = require("../model/user.model");
exports.create = async (req, res) => {

  try {
    console.log("hello");

    const userCreate = new users({
      role: req.body.role,
      name: req.body.name,
      isOnline: req.body.isOnline,
    });
    const saveUser = await userCreate.save();
    console.log(saveUser);
    res.send(req.body);
  } catch (e) {
    // console.log(e.message);
    return e
  }
};

exports.getAllUser = async (res) => {
  try {
    const user = await users.find();
  } catch (error) {
    return null
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await users.findById(userId);
    return user;
  } catch (e) {
    return null
  }
};

// exports.updateUserData = async (userId) => {
//   try {
//     const updateUser = {
//       isOnline: true,
//     };
//     const user = await users.findByIdAndUpdate(userId, updateUser, {
//       new: true,
//     });
//     return user;
//   } catch (e) {
//     return null
//   }
// };

// exports.updateData = async (userId) => {
//   try {
//     const updateUser = {
//       isOnline: false,
//     };
//     const updateData = await users.findByIdAndUpdate(userId, updateUser, {
//       new: true,
//     });
//     return updateData;
//   } catch (error) {return null}
// };

