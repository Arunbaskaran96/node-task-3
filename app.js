const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyparser.json());

const MentorController = require("./Controllers/MentorController");
const StudentController = require("./Controllers/StudentController");

app.use("/", MentorController);
app.use("/", StudentController);

module.exports = app;
