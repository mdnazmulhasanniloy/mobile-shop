const { access_Token } = require("../config");
const ApiError = require("../errors/apiError");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const {
  createUserService,
  deleteUserService,
  updateUserService,
  getAllUserService,
  getUsersByEmailService,
} = require("../service/user.service");
const sendResponse = require("../utils/sendResponse");

//add users
exports.createUsers = async (req, res, next) => {
  try {
    const result = await createUserService(req.body);
    console.log("result", result);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//get users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await getAllUserService();

    if (!users) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "users not found",
        data: users,
      });
    }
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "users successfully get",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

//update user

exports.updateUser = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    // console.log(req.body);
    const result = await updateUserService(_id, req.body);
    // console.log(result);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//delete user

exports.deleteUser = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await deleteUserService(_id);
    console.log(result);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//get user by email
exports.getUsersByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await getUsersByEmailService(email);
    if (result) {
      const token = jwt.sign({ email: result?.email }, access_Token, {
        expiresIn: "3d",
      });
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "user login successfully",
        data: { ...result?._doc, accessToken: token },
      });
    }

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "user not found",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
