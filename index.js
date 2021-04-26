// using express platform for this project
const express = require("express");
// declaring cors middleware
const cors = require("cors");
// we use bodyParser, to make sure that an app will be able to accept input param i.e JSON values
var bodyParser = require("body-parser");

const app = express();

const userList = new Map();

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("active");
});

// to send the data in the binary form we need a post method
app.post("/create", (req, res) => {
  if (req.body.username && req.body.password) {
    // save the values
    userList.set(req.body.username, req.body.password);
    res.status(200).send({ success: true });
    return;
  }
  res.status(401).send({ success: false });
});

// this is third end point to login
app.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    // get the values
    const existingPassword = userList.get(req.body.username);

    const isValidExistingUser =
      existingPassword === req.body.password ? true : false;

    if (isValidExistingUser) {
      res.status(200).send({ success: true });
    }
  }
  res.status(401).send({ success: false });
});

app.listen(3000);

// const express = require("express");
// const app = express();

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// app.listen(3000)
