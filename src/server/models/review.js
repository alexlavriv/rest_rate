const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/rest-rate-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const reviewSechema = new mongoose.Schema({
    describtion: {type: String},
    completed: {type: Boolean},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }},{
        timestamps:true
    })
const Review = mongoose.model('Review',reviewSechema)

module.exports = Review