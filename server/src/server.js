const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const DBConnetion = require("./config/db.config");
const mongoose = require("mongoose");
const path = require("path");

require("express-async-errors");
//sss
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

//**Enable CORS */
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

DBConnetion(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
    console.log("server not connected");
  });

const StartServer = function () {
  //**Routes */

  /** Deafult route */
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Welcome to the API" });
  });

  /**Static Route */
  const __dirname = path.resolve();
  app.use("/images", express.static(path.join(__dirname, "src/uploads")));

  /** Api routes */
  app.use("/api/category", require("./routes/category.route"));
  app.use("/api/product", require("./routes/product.route"));

  /** Error handler */
  app.use(require("./middleware/error.middleware"));

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
