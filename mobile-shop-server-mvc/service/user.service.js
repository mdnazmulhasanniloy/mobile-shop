const httpStatus = require("http-status");
const ApiError = require("../errors/apiError");
const User = require("../models/user");
const moment = require("moment");

const justNow = moment().format();
//create a new user
exports.createUserService = async (data) => {
  try {
    const result = await User.create({
      ...data,
      createAt: justNow,
      updateAt: justNow,
    });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user creation failed");
  }
};

// get all user
exports.getAllUserService = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Users not found");
  }
};

//update user
//update a user
exports.updateUserService = async (_id, data) => {
  try {
    console.log(data);
    const user = await User.findOneAndUpdate(
      { _id: _id },
      { ...data, updateAt: justNow }
    );
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user update failed");
  }
};

//delete a user
exports.deleteUserService = async (_id) => {
  try {
    const user = await User.deleteOne({ _id: _id });
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "user delete operation is failed"
    );
  }
};

// find user by id
