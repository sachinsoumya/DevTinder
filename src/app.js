const express = require("express");

// console.log(typeof express);

const app = express();


app.get("/user", (req, res) => {
  res.send({ firstName: "Sachin", lastName: "Panda" });
});

app.post("/user", (req, res) => {
  //* saving data to database via post call
  res.send("Saving data to database...");
});

app.put("/user",(req,res)=>{
  res.send('users updated  successfully');
});


app.delete("/user", (req, res) => {
  res.send("Deleted data from database successfully..");
});

app.use("/test", (req, res) => {
  res.send("Hello world from express javascript..");
});

app.listen(7777, () => {
  console.log("server is sucessfully in port 7777....");
});
