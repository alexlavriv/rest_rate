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
        const saved_review = await review.save();
        
        res.send({saved_review} )
    } catch(e){
        res.send(e)
    }
});

module.exports = router;