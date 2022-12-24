import CustomError from "../error/custom.error.js";

const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({
    error: err.message,
    msg: "Something went wrong, please try again later",
  });
};

export default ErrorHandlerMiddleware;
