var express = require('express');
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  User
  .find()
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.log(error)
  })
});

module.exports = router;
