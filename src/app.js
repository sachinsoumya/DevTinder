const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { validateSignUpData } = require("./utils/validation");

// const { adminAuth, userAuth } = require("./middlewares/auth");

// console.log(typeof express);

const app = express();

const connectDb = require("./config/database");

const User = require("./models/user");

console.log(require("./config/database"));

require("./config/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    // const user = await User.findOne({ email: req.body.email });

    // if (!user) {
    //   res.send("User not found");
    // } else {
    //   res.send(user);
    // }

    // const user = await User.findById({_id:req.body._id});

    // console.log(user);
    // res.send(user);

    console.log(user);

    if (user.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });

    // const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//*Update the user data.
app.patch("/user/:userId", async (req, res) => {
  console.log(req.params);
  const userId = req.params?.userId;

  const data = req.body;

  console.log(userId);
  // console.log(mongoose.Types.ObjectId.isValid(userId));

  // const userid = mongoose.Types.ObjectId(userId)

  try {
    const allowedUpdate = ["gender", "photoUrl", "about", "skills", "age"];

    const isUserUpdate = Object.keys(data).every((item) =>
      allowedUpdate.includes(item)
    );

    console.log(isUserUpdate);

    if (!isUserUpdate) {
      throw new Error("can't update user");
    }

    if (data.skills?.length > 10) {
      throw new Error("you can only update upto 10 skills");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: "true",
    });
    console.log(user);
    // const user = await User.findOneAndUpdate({ email: req.body.email }, data);
    // console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Updation Failed Something went wrong" + err.message);
  }
});

//* Feed Api = getting

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
