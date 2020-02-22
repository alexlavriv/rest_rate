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
        avg_rating: {type:Number},
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
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;


/** This is a description of the foo function. */
reviewSchema.pre('save', async function (next){
    const review = this;
    review.avg_rating = average([review.staff_rating, review.clean_rating, review.drive_rating, review.delivery_rating, 
                                    review.food_rating]);
    
    console.log("just before saving ", review);
    next();
});


reviewSchema.statics.get_all = async  () =>{
    console.log("in model");
    const review_list = await Review.find();

    if (!review_list){
        throw new Error("Unable to log in")
    }

    return review_list;

};

const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
 

reviewSchema.statics.get_all_rest_names = async  () =>{
    console.log("in model");
    const review_list = await Review.find();
    let names = review_list.map(rest =>  toTitleCase(rest.rest_name))
    names =  [...new Set(names)]
    if (!names){
        throw new Error("Unable to log in")
    }

    return names;

};


const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;