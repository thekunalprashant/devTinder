const express = require("express");
const app = express();

app.get(/.*fly$/, (req, res) => {
  res.send("jsjjssjs");
});
app.get("/user", (req, res) => {
  console.log(req.query);
  const queryP = req.query;
  res.send({ firstName: "Kunal", lastName: "Prashant" , queryP});
});
app.post("/user", (req, res) => {
  res.send("User Data Saved to database.");
});
app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});
// app.use("/", (req, res) => {
//   res.send("namaste kunal!");
// });

app.listen(7777, () => {
  console.log("Server is running....");
});
