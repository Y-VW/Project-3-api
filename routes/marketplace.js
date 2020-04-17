const express = require("express");
const router = express.Router();
const UserPlant = require("../models/UserPlant");
const User = require("../models/User");

// To show all plants of all users
router.get("/", function (req, res, next) {
  UserPlant.find().then((plants) => {
    console.log("all plants", plants);
    res.json(plants);
  });
});

router.get("/search", function (req, res) {
  let q = req.query.q;
  console.log("getting suggestions for: ", q);
  UserPlant.find({ name: { $regex: `${q}.*`, $options: "-i" } }).then(
    (plants) => {
      console.log("all filtered plants:", plants);
      res.json(plants);
    }
  );
});

router.get("/searchGeo", function (req, res) {
  const distance = parseInt(req.query.distance);
  const user = req.session.currentUser;
  if (!user) {
    res.status(401).json();
  }
  const coordinates = user.coordinates;
  if (!coordinates) {
    res.status(500).json({ err: "logged in user doesn't have coordinates" });
  }

  console.log(`getting plants within radius ${distance} from ${coordinates}`);
  User.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates },
        distanceField: "dist.calculated",
        minDistance: 2,
        maxDistance: distance,
        includeLocs: "dist.location",
        spherical: true,
      },
    },
  ]).then((users) => {
    const userIds = users.map((user) => user._id);

    const distances = {};
    users.forEach((user) => (distances[user._id] = user.dist.calculated));
    console.log("distances", distances);

    UserPlant.find({
      creator: { $in: userIds },
    }).then((plants) => {
      const newPlants = plants.map((plant) => {
        return {
          ...plant._doc,
          distance: distances[plant.creator]
        };
      });
      newPlants.sort((p1, p2) => {
        if (p1.distance < p2.distance) {
          return -1;
        }
        if (p1.distance > p2.distance) {
          return 1;
        }
        return 0;
      })
      res.json(newPlants)
    });
  });
});

module.exports = router;
