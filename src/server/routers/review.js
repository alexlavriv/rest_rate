const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
const multer = require('multer');

const router = new express.Router();
const upload = multer();

async function getAllReviews(res) {
    try
    {
        console.log("In all reviews");
        const review_list = await Review.get_all();
        console.log(review_list);
        res.send({review_list} )
    } catch(e){
        res.send(e)
    }
}

router.patch("/review/edit", async (req, res) => {
    console.log('in review edit');
    let review = new Review(req.body);
    console.log('before updating', review);
    Review.findOneAndUpdate({_id: review._id}, review, async (err, patchedReview) => {
        if (err) {
            console.log("EDIT ERROR");
            res.status(400).send(err);
        } else if (!patchedReview) {
            console.log("EDIT ERROR2");
            res.status(400).send("Couldn't replace review");
        } else {
            console.log("EDIT SUCCESS", review);
            await getAllReviews(res);
        }
    })
});

router.post('/review/:login_name',upload.array('files'), async (req, res) => {
    const {files} = req;
    const review = new Review(req.body);
    // review.user = req.params.login_name;
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
        User.findOne({login_name: req.params.login_name}, async (err, foundUser) => {
            if (err) {
                res.status(400).send();
            } else if (!foundUser) {
                res.status(400).send("User not found");
            } else {
                review.user = foundUser._id;
                try
                {
                    await review.save();
                    const review_list = await Review.get_all();
                    res.send({review_list} )
                } catch(e) {
                    res.send(e)
                }
            }
        });
    } );
});

router.get('/all_reviews', async (req, res) => {
    await getAllReviews(res);
});

router.get('/restaurant_all_names', async (req, res) => {
    try
    {
        console.log("In all rests");
        const names = await Review.get_all_rest_names();
        console.log(names);
        res.send({names} )
    } catch(e){
        res.send(e)
    }
});

router.post('/query_review', async (req, res) => {
    console.log("/query_review");
    let query = req.body;
    console.log(query);
    try
    {
        console.log("In all rests");
        const reviews = await Review.find(query).populate('user');
        console.log(reviews);
        res.send({reviews} )
    } catch(e){
        res.send(e)
    }
});

router.delete('/review/delete/:id', async (req, res) => {
   console.log('delete id:', req.params.id);
   Review.findOneAndDelete({_id: req.params.id}, async (err) => {
       if (err) {
           res.status(400).send(err);
       } else {
           await getAllReviews(res);
       }
   })
});




module.exports = router;