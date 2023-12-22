const httpStatus = require("http-status");
const { access_Token } = require("../config");
const sendResponse = require("../utils/sendResponse");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "unAuthorize access",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, access_Token, function (err, decoded) {
    if (err) {
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: "forbidden access",
      });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyJwt;
