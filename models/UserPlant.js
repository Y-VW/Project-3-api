const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    title: String,
    name: String,
    imgName: String,
    imgPath: String,
    description: String,
    city: String,
    country: String,
    paymentType: String,
}); 

const UserPlant = mongoose.model("userPlants", PlantSchema);
module.exports = UserPlant;