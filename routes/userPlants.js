const axios = require("axios");
const express = require("express");
const router = express.Router();
const UserPlant = require("../models/UserPlant");
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary.js");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

// To show all plants of the user
router.get("/", function (req, res, next) {
  const userId = req.session.currentUser._id;
  UserPlant.find({ creator: ObjectId(userId) }).then((plants) => {
    console.log("all plants from user:", plants);
    res.json({ userPlants: plants });
  });
});

//to create a new one
router.post("/create", uploadCloud.single("photo"), function (req, res, next) {
  console.log("session:", req.session);
  console.log("body:", req.body);

  const userId = req.session.currentUser._id;
  UserPlant.create({
    title: req.body.title,
    name: req.body.name,
    plantApiId: req.body.plantApiId,
    imgPath: req.file.url,
    imgName: req.file.originalname,
    description: req.body.description,
    city: req.body.city,
    paymentType: req.body.paymentType,
    creator: userId,
  })
    .then((addedPlant) => {
      res.json(addedPlant);
    })
    .catch((err) => {
      console.log("Cant create new plant");
      res.status(500).json(err);
    });
});

//to update
router.post("/:id/update", function (req, res, next) {
  console.log("REQ.BODY", req.body);
  UserPlant.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    paymentType: req.body.paymentType,
  })
    .then((updatedPlant) => {
      res.json(updatedPlant);
    })
    .catch((err) => {
      console.log("Cant update plant");
      res.status(500).json(err);
    });
});

//to delete
router.delete("/:id", function (req, res, next) {
  UserPlant.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json();
    })
    .catch((err) => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

module.exports = router;
