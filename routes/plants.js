const axios = require("axios");
const express = require("express");
const router = express.Router();
const UserPlant = require("../models/UserPlant");

const PLANTURL = "https://trefle.io/api/plants";
const PLANTAPIKEY = process.env.PLANTAPIKEY;

//to get detail page of a plant
router.get("/:id", function (req, res, next) {
  UserPlant
    .findById(req.params.id)
    .then((plant) => {
      axios
        .get(`${PLANTURL}/${plant.plantApiId}?token=${PLANTAPIKEY}`)
        .then((apiResponse) => {
          console.log("ApiResponse:", apiResponse)
          res.json({plant: plant, api: apiResponse.data});  
        });
    })
    .catch((err) => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

module.exports = router;
