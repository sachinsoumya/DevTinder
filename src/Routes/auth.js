const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  console.log(req);
  console.log(req.body);

  const { firstName, lastName, email, password, age, gender, skills } =
    req.body;

  try {
    //* Validation of data

    validateSignUpData(req);

    //* Encrypt the password - Once you encrypt the password then it can not be decrypted.

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    console.log(passwordHash);

    //* Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      skills,
    });

    const savedUser = await user.save();

    const token = await savedUser.getJwtToken();

    console.log(token);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User saved successfully...!!", data: savedUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      //* Create a JWT token

      const token = await user.getJwtToken();

      if (!token) {
        throw new Error("Invalid Token");
      }

      console.log(token);

      if (!user) {
        throw new Error("User not found");
      }

      //*Add  the token to the cookie and send back the response to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("Logout successful..!!");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = authRouter;
