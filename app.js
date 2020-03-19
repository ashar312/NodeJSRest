const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const moongoose = require('mongoose');


const uri = 'mongodb://localhost:300'
const URL = 'mongodb+srv://Ashar:jupitar6@cluster0-9zibs.mongodb.net/test?retryWrites=true&w=majority'
moongoose.connect(URL,{ useNewUrlParser: true })




app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());


app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Types, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, PATCH')
        res.status(200).json({})
    }
    next();
})

const ProductRoutes = require('./Api/routes/Products');
const OrderRoutes = require('./Api/routes/Order');

app.use('/products',ProductRoutes);
app.use('/orders',OrderRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app;