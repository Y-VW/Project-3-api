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

module.exports = router;
