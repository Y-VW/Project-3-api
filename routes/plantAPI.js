const axios = require("axios");
const express = require("express");
const router = express.Router();

// const PlantInfo = require("../models/PlantInfo");

const APIURL = process.env.APIURL
const PLANTURL = "https://trefle.io/api/plants"
const PLANTAPIKEY = process.env.PLANTAPIKEY

//to search name
router.get('/search', function (req, res, next) {
  let q = req.query.q;
  console.log("getting suggestions for: ", q)
  axios
    .get(`${PLANTURL}?token=${PLANTAPIKEY}&q=${q}`)
    .then(response => {
      console.log("API response: ", response)
      res.json({plants: response.data});  
    })
    .catch((err) => {
      console.error(err)
      res.status(500);
      res.json({err})
  });
})

module.exports = router;
