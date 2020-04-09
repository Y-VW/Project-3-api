const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: String,
    imgName: String,
    imgPath: String,
});

const Plant = mongoose.model("users", PlantSchema);
module.exports = Plant;