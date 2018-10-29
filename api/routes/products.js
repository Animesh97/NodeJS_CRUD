var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ProductsModel = require('../models/products');

router.get('/',(req,res,next)=>{
    ProductsModel.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error);
    });
})

router.get('/:productId', (req,res,next)=>{
    ProductsModel
    .findById(req.params.productId)
    .exec()
    .then(document =>{
        console.log(document);
        res.status(200).json(document);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',(req,res,next)=>{
    const product = new ProductsModel({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product
    .save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            products : product
        });
    })
    .catch((error)=>{
        console.log(error);
    })
});

router.patch('/:productId',(req,res,next)=>{
    console.log("Entered PATCH method")
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propertyName] = ops.value;
    }
    ProductsModel.update({_id : id}, {$set : updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error=>{ 
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;