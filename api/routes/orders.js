var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Product = require('../models/products');

router.get('/', (req,res,next)=>{
    res.status(200).json({
        "message" : "This is a GET request to orders"
    });
});

router.post('/',(req,res,next)=>{
   // console.log(req.body);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product
    .save()
    .then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        "message" : "This is a POST request to orders"
    });
});

module.exports = router;