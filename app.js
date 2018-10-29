const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://shopper:shopper@shopapi-oao0j.mongodb.net/test?retryWrites=true',{
    useNewUrlParser : true
})

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/products',productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        'message' : error.message
    });
});

module.exports = app;