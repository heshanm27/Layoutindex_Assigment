const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const DBConnetion = require("./config/db.config");
const mongoose = require("mongoose");

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

  /** User routes */

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
