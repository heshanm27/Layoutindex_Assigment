const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const unquiePrefix = Date.now().toString();
    cb(null, unquiePrefix + "-" + file.originalname);
  },
});
console.log("uploadImages.middleware.js");
const Upload = multer({
  storage: Storage,
});

module.exports = Upload;
