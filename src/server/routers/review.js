const express = require('express');
const router =new express.Router();
const Review = require('../models/review');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');


router.post('/review', async (req, res) => {
    console.log(req.body);
    const review = new Review(req.body);
    try
    {
        await review.save();
        const review_list = await Review.get_all()
        res.send({review_list} )
    } catch(e){
        res.send(e)
    }
});

router.get('/all_reviews', async (req, res) => {
    try
    {
        console.log("In all reviews")
        const review_list = await Review.get_all()
        console.log("got from db")
        console.log(review_list)
        res.send({review_list} )
    } catch(e){
        res.send(e)
    }
});



module.exports = router;