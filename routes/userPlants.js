const axios = require("axios");
const express = require("express");
const router = express.Router();
const UserPlant = require("../models/UserPlant");
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary.js");
const mongoose = require("mongoose")

//To show all
// router.get("/create", function (req, res, next) {
//     User.findById(req.session.currentUser._id)
//         .then(currentUser => {
//             res.json({
//                 currentUser: req.session.currentUser,
//             });
//         });
// })

//to create a new one
router.post('/create', uploadCloud.single('photo'), function (req, res, next) {
    console.log("session:", req.session);
    const userId = req.session.currentUser._id
    UserPlant
        .create({
            title: req.body.title,
            name: req.body.name,
            imgPath: req.file.url,
            imgName: req.file.originalname,
            description: req.body.description,
            city: req.body.city,
            paymentType: req.body.paymentType,
            creator: userId
        })
        .then((addedPlant) => {
            res.json(addedPlant);
        })
        .catch(err => {
            console.log("Cant create new plant")
            res.status(500).json(err)
        });

})


module.exports = router;
