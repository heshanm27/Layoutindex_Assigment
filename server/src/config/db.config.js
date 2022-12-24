const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DBConntect = async (uri) => {
  return await mongoose.connect(uri, options);
};

module.exports = DBConntect;
