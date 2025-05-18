const express = require("express");

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/auth");

const profileRouter = require("./Routes/profile");

const requestRouter = require("./Routes/request");

const userRouter = require("./Routes/user");

// const jwt = require("jsonwebtoken");

// const { adminAuth, userAuth } = require("./middlewares/auth");

// console.log(typeof express);

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const connectDb = require("./config/database");

console.log(require("./config/database"));

require("./config/database");

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

console.log(typeof User);

connectDb()
  .then(() => {
    console.log("Database connection established");

    app.listen(7777, () => {
      console.log("server is sucessfully in port 7777....");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err.message);
  });
