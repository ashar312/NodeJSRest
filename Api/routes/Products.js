const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const Product = require('../../models/product'); 

router.get('/',(req,res,next) => {
    res.status(200).json({
        messsage : 'Handling Get request to /products'
    })
});

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId
    console.log("ID",id)
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("Doc",doc)
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    })
    
});


router.patch('/:productId',(req,res,next) => {
    const id = req.params.productId
    res.status(200).json({
        messsage : 'Product Updated',
        id : id
    })
    
});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId
    res.status(200).json({
        messsage : 'Product Deleted',
        id : id
    })
});


router.post('/',(req,res,next) => {
    console.log("req",req.body);

    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    console.log("product",product)
    product.save()
    .then(res => {
        console.log("saved",res)
    }).catch(err => {
        console.log("errpr",err)
    })
    res.status(201).json({
        messsage : 'Handling POST  request to /products',
        createdProduct : product
    })
});



module.exports = router
