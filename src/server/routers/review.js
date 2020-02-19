const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();
const upload = multer();

router.post('/review/:login_name',upload.array('files'), async (req, res) => {
    const {files} = req;
    const review = new Review(req.body);
    review.user = req.params.login_name;
    const restaurantName = review.rest_name;
    Restaurant.findOne({rest_name: restaurantName}, async (err, foundRestaurant) => {
        if (err) {
            res.status(400).send();
        } else if (!foundRestaurant) {
            const restaurant = new Restaurant({rest_name: restaurantName});
            restaurant.save();
        }
        files.forEach(file => {
            review.files.push(file.buffer);
        });
        try
        {
            await review.save();
            const review_list = await Review.get_all();
            res.send({review_list} )
        } catch(e) {
            res.send(e)
        }
    } );
});

router.get('/all_reviews', async (req, res) => {
    try
    {
        console.log("In all reviews");
        const review_list = await Review.get_all();
        console.log("got from db");
        console.log(review_list);
        res.send({review_list} )
    } catch(e){
        res.send(e)
    }
});

module.exports = router;