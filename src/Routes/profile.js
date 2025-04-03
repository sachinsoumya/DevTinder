const express = require("express");
const { userAuth } = require("../middlewares/auth");

const { validateProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }

  // res.send(cookies);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  //* Validate profile data

  try {
    if (!validateProfileData(req)) {
      throw "Edit not allowed on this";
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    //* save the data inside database
    await loggedInUser.save();

    console.log(loggedInUser);

    res.json({
      message: `${loggedInUser.firstName} , your profile has been updated`,
      data: loggedInUser,
    });
    // res.send(loggedInUser.firstName + " " + "Profile updated successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = profileRouter;
