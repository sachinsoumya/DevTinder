const express = require("express");

// const { adminAuth, userAuth } = require("./middlewares/auth");

// console.log(typeof express);

const app = express();

const connectDb = require("./config/database");

const User = require("./models/user");

console.log(require("./config/database"));

require("./config/database");

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName : "John",
  //   lastName:"Smith",
  //   email:"John@example.com",
  //   password:"John1234"
  // }
  //* Creating a new instance of the user model
  const user = new User({
    firstName: "Surya",
    lastName: "Kumar",
    email: "Surya@example.com",
    password: "Sun234",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.send(err.message);
  }
});

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
