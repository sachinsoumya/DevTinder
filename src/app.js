const express = require("express");

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
  // const userObj = {
  //   firstName : "John",
  //   lastName:"Smith",
  //   email:"John@example.com",
  //   password:"John1234"
  // }
  //* Creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.send(err.message);
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
