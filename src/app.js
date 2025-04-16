const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("user data error");
    res.send("User data");
  } catch (error) {
    res.status(500).send("Some error occured contact support team")
  }
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
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  }
});
app.listen(7777, () => {
  console.log("Server is running....");
});
