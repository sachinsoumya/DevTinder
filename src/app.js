const express = require("express");

const { adminAuth, userAuth } = require("./middlewares/auth");

// console.log(typeof express);

const app = express();

// console.log(app.use("/" ,(a,b,c)=>{}));
//* Handle middlewares for all the requests like get , post , put ,patch , delete
app.use("/admin", adminAuth);


app.use("/", (err, req, res, next) => {
  if (err) {
    //we can log the error here
    res.status(500).send('something went wrong');
  }
});

app.get("/getUserData", (req, res, next) => {
  //* Logic of db call and get the user data

  // try {
    throw new Error("xyzvfhfjfkl");
    res.send("User data sent");
  // } catch (err) {
  //   res.status(500).send(`something went wrong ${err.message}`);
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //we can log the error here
    res.status(500).send('something went wrong');
  }
});

app.post("/user/login", (req, res, next) => {
  res.send("logged in successfully");
});

app.get("/user/data", userAuth, (req, res, next) => {
  res.send("User data is already sent");
});

app.get("/admin/getAllData", (req, res, next) => {
  //* Logic for checking the user is authorised or not
  res.send("all data are sent");
});

app.get("/admin/deleteUser", (req, res) => {
  //* Logic for checking the user is authorised or not
  res.send("Deleted user successfully");
});

app.listen(7777, () => {
  console.log("server is sucessfully in port 7777....");
});
