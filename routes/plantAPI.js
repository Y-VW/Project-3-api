const axios = require("axios");
const express = require("express");
const router = express.Router();

// const PlantInfo = require("../models/PlantInfo");

const APIURL = process.env.APIURL
const PLANTURL = "https://trefle.io/api/plants"
const PLANTAPIKEY = process.env.PLANTAPIKEY


router.get('/', function (req, res, next) {
  console.log("getting plants")
  axios
    .get(`${PLANTURL}?token=${PLANTAPIKEY}`)
    .then(response => {
      res.json({plants: response.data});  
    })
    .catch((err) => {
      console.error(err)
      res.status(500);
      res.json({err})
  });
})

module.exports = router;
