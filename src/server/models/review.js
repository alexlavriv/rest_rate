const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/rest-rate-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});
const reviewSchema = new mongoose.Schema(
    {
        rest_name: {type: String},
        rest_review: {type: String},
        bathroom_rating: {type: Number},
        staff_rating: {type: Number},
        clean_rating: {type: Number},
        drive_rating: {type: Number},
        delivery_rating: {type: Number},
        food_rating: {type: Number},
        files: {type: Array},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        user_name: String
    },
    {
        timestamps:true
    }
);

reviewSchema.statics.get_all = async  () =>{
    console.log("in model");
    const review_list = await Review.find();

    if (!review_list){
        throw new Error("Unable to log in")
    }

    return review_list;

};


const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;