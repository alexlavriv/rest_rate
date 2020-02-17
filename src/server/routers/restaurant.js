const express = require('express');
const Restaurant = require('../models/restaurant');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();

router.get('/restaurant/:id', async (req, res) => {
    Restaurant.findById(req.params.id).populate("reviews").exec((err, restaurant) => {
        if (err) {
            console.log(err);
            res.send(e);
        } else if (!restaurant) {
            console.log("restaurant not found");
            res.status(400).send()
        } else {
            console.log("restaurant found");
            res.send(restaurant);
        }
    })
});