var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const OrdersModel = require('../models/orders');

router.get('/', (req,res,next)=>{
    OrdersModel.find()
    .exec()
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(404).json(error);
    });
});

router.get('/:orderId',(req,res,next)=>{
    OrdersModel.findById(req.params.orderId)
    .exec()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
})

router.post('/',(req,res,next)=>{
   // console.log(req.body);
    const orders = new OrdersModel({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    orders.save()
    .then((result)=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    });
    
});

router.patch('/:orderId',(req,res,json)=>{
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propertyName] = ops.value;
    }
    OrdersModel.update({_id : id}, {$set : updateOps})
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