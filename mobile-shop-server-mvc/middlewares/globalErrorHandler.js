const { nod_env } = require("../config");
const sendResponse = require("../utils/sendResponse");

// ErrorHandler.js
const ErrorHandler = (err, req, res, next) => {
  // console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  sendResponse(res, {
    statusCode: errStatus,
    success: false,
    message: errMsg,
    stack: nod_env === "development" ? err.stack : undefined,
  });
};

module.exports = ErrorHandler;
