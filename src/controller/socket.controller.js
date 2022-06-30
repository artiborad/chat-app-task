const users = require("../model/user.model");

responseGenrate = (error, msg, userDetails) => {
  const datafinal = {
    error: error,
    message: msg,
    data: userDetails,
  };
  return datafinal;
};


exports.createNewUser = async (user, callback) => {
  let response;

  try {
    if (user) {
      const newUser = new users(user);
      let finalUser = await newUser.save();
      response = responseGenrate(
        false,
        "user is created successfully!!",
        finalUser
      );
    } else {
      response = responseGenrate(true,"user required some field",finalUser);
    }
  } catch (e) {
    response = responseGenrate(true, "error", e);
  }
  if (callback) {
    callback(response);
  }
};

exports.updateUserDetails = async (user, callback) => {
  let response;
    console.log("updated user api")
  try {
    if (user) {
      const update = await users.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      response = responseGenrate(false, "User Updated  Succesfully!!", update);
    } else {
      response = responseGenrate(true, "user required some field");
    }
  } catch (error) {
    response = responseGenrate(true, "User not Updated  Succesfully!!", error);
  }
  if (callback) {
    callback(response);
  }
};

exports.getUserDetails = async (user, callback) => {
  let response;
  try {
    if (user) {
      const getuser = await users.findById(user.id);

      response = responseGenrate(false, "find all data sucessfully!!", getuser);
    }else{
        response = responseGenrate(true, "user required some field");
    }
  } catch (e) {
    response = responseGenrate(true, "Error in Getting User Details!", e);
  }
  if (callback) {
    callback(response);
  }
};

exports.deleteUser = async (user, callback) => {
  let response;
  try {
    if(user){
        const deluser = await users.findByIdAndDelete(user._id);
        response = responseGenrate(false, "Deleted Successfully!", deluser);
    }else{
        response = responseGenrate(true, "user required some field");
    }
    
  } catch (error) {
    console.log(error);
    response = responseGenrate(true, "Error in Deleting User", error);
  }
  if (callback) {
    callback(response);
  }
};



exports.updateOnlineVisibility = async (userId,isOnline) => {
    try {
      const updateUser = {
        isOnline
      };
      const user = await users.findByIdAndUpdate(userId, updateUser, {
        new: true,
      });
      return user;
    } catch (e) {
      return null
    }
  };
 
  module.exports=responseGenrate