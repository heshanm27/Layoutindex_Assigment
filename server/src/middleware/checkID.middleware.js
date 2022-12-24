const validator = require("validator");
const CustomError = require("../error/custom.error");

const CheckID = (req, res, next) => {
  const id = req.params.id;

  if (validator.isMongoId(req.params.id) === false) throw new CustomError("Invalid id", 400);

  next();
};

module.exports = CheckID;
