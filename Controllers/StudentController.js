const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const students = require("../Models/Studentmodel");

//create student

router.post("/student", (req, res) => {
  if (res) {
    const Student = new students({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city,
    });

    Student.save()
      .then((result) => {
        res.status(200).json({ message: "created" });
      })
      .catch((er) => {
        res.status(500).json({ message: "something went wrong" });
        console.log(er);
      });
  } else {
    res.status(400).json({ message: "no data found" });
  }
});

//get all the students

router.get("/students", (req, res) => {
  students
    .find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no data found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

//update student

router.put("/student/:id", (req, res) => {
  if (req) {
    const student = students
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      )
      .then((result) => {
        res.status(200).json({ message: "updated" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      });
  } else {
    res.status(200).json({ message: "no data found" });
  }
});

//get students who are assigning to individual mentor

router.get("/managestudents/:id", (req, res) => {
  students
    .find({ mentorid: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no data found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

// student who has a mentor should not be shown in List
router.get("/studentlist/:id", (req, res) => {
  students
    .find({ isAssigned: false })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no data found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

//Delete student
router.delete("/student/:id", (req, res) => {
  students
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
