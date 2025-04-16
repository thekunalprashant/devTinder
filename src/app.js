const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent !");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(7777, () => {
  console.log("Server is running....");
});
