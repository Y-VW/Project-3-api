const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: String,
    imgName: String,
    imgPath: String,
});

const UserPlant = mongoose.model("userPlants", PlantSchema);
module.exports = UserPlant;