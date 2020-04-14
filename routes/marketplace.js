const express = require("express");
const router = express.Router();
const UserPlant = require("../models/UserPlant");

// To show all plants of all users
router.get("/", function (req, res, next) {
    UserPlant
    .find()
    .then((plants) => {
        console.log("all plants", plants)
        res.json(plants)
    })
})


router.get("/search", function (req, res, next) {
    let q = req.query.q;
    console.log("getting suggestions for: ", q)
    UserPlant
    .find({"title" : {$regex : `${q}.*`}})
    .then((plants) => {
        console.log("all filtered plants:", plants)
        res.json(plants)
    })
})

module.exports = router;
