const express = require("express");
// const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const mentors = require("../Models/Mentormodel");

//create mentor
router.post("/mentor", (req, res) => {
  if (res) {
    const Mentor = new mentors({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city,
    });

    Mentor.save()
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

//get all the mentors
router.get("/mentors", (req, res) => {
  mentors
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

//get single mentor

router.get("/mentor/:id", (req, res) => {
  mentors
    .find({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no data fond" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

//update single mentor
router.put("/mentor/:id", (req, res) => {
  const user = mentors.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (user) {
    user.then((result) => {
      res.status(200).json({ message: "updated" });
    });
  } else {
    res.status(200).json({ message: "no data found" });
  }
});

//delete mentor
router.delete("/mentor/:id", (req, res) => {
  mentors
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "something went wrong" });
    });
});
module.exports = router;
