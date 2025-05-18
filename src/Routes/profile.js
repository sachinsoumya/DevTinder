const express = require("express");
const { userAuth } = require("../middlewares/auth");

const { validateProfileData } = require("../utils/validation");

const { uploadCloudinary } = require("../utils/cloudinary");

const profileRouter = express.Router();

const { upload } = require("../middlewares/multer");

const fs = require("fs");

console.log(upload);

profileRouter.get(
  "/profile/view",
  userAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const { user } = req;

      res.send(user);
      console.log(req.file);
    } catch (err) {
      res.status(400).send(err.message);
    }

    // res.send(cookies);
  }
);

profileRouter.patch(
  "/profile/edit",
  userAuth,
  upload.single("photoUrl"),
  async (req, res) => {
    console.log(req.body); //* working
    console.log(req.file); //* req.file is  wworking..
    // console.log(upload);
    let imageUrl = null;

    //* Validate profile data

    try {
      if (!validateProfileData(req)) {
        throw "Edit not allowed on this";
      }

      if (req.file) {
        imageUrl = await uploadCloudinary(req.file.path);
      }

      console.log(imageUrl);

      if (imageUrl) {
        req.body.photoUrl = imageUrl.secure_url;
      }

      const loggedInUser = req.user;
      console.log(loggedInUser);

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );

      //* save the data inside database
      await loggedInUser.save();

      console.log("loggedInUser" + loggedInUser);

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
          return;
        }
        console.log("File deleted successfully");
      });

      res.json({
        message: `${loggedInUser.firstName} , your profile has been updated`,
        data: loggedInUser,
      });

      // res.send(loggedInUser.firstName + " " + "Profile updated successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = profileRouter;
