const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.session.destroy(response => {
      res.json(response)
    })
});

module.exports = router;
