const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/rest-rate-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const reviewSechema = new mongoose.Schema({
    rest_name: {type: String},
    rest_review: {type: String},
    // owner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref:'User'
    // }}
    },{
        timestamps:true
    })

reviewSechema.statics.get_all = async  () =>{
    console.log("in model")
    const review_list = await Review.find();

    if (!review_list){
        throw new Error("Unable to log in")
    }

    return review_list;

};
const Review = mongoose.model('Review',reviewSechema)

module.exports = Review