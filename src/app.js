const express = require("express");

// console.log(typeof express);

const app = express();

// console.log(app);

app.get("/", (req, res) => {
  res.send("Hello from dashboard .....");
});

app.get("/test", (req, res) => {
  res.send("Hello world from express javascript..");
});

app.get("/hello", (req, res) => {
  res.send("1");
});

app.get('/about' , (req , res)=>{
    res.send("This is about route");
})

app.listen(7777, () => {
  console.log("server is sucessfully in port 7777....");
});
