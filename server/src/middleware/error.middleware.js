const CustomError = require("../error/custom.error.js");

const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ status: error, error: err.message });
  }

  return res.status(500).json({
    status: "error",
    error: err.message,
    msg: "Something went wrong, please try again later",
  });
};
module.exports = ErrorHandlerMiddleware;
