const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    title: String,
    name: String,
    imgName: String,
    imgPath: String,
    description: String,
    paymentType: String,
    creator: 
        {
          type : mongoose.Schema.ObjectId,
          ref : 'users'
        }
}); 

const UserPlant = mongoose.model("userplants", PlantSchema);
module.exports = UserPlant;