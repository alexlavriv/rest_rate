const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/rest-rate-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});

const restaurantSchema = new mongoose.Schema({
    rest_name: String,
    rest_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;