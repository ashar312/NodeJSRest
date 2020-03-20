const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const Product = require('../../models/product'); 

router.get('/',(req,res,next) => {

    Product.find()
    .exec()
    .then(doc => {
        console.log("All Doc",doc);
        res.status(200).json(doc);
        res.status(200).json({
            messsage : 'Handling Get request to /products'
        })
    }).catch(err => {
        res.status(500).json({error : err})
    })
    
});

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId
    console.log("ID",id)
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("Doc",doc)
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message : "No Valid ID found"
            })
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    })
    
});


router.patch('/:productId',(req,res,next) => {
    const id = req.params.productId
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id : id}, {$set : updateOps})
    .exec()
    .then(updated => {
        console.log("updated", updated);
        res.status(200).json(updated);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    })
    
});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId
    Product.remove({_id : id})
    .exec()
    .then(ressult =>{
        console.log(ressult);
        res.status(200).json(ressult);
    }).catch(err => {
        res.status(500).json({error : err});
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
    var res1 = res;
    product.save()
    .then(res => {
        console.log("saved",res)
        res1.status(201).json({
            messsage : 'Handling POST  request to /products',
            createdProduct : product
        })
    }).catch(err => {
        console.log("errpr",err)
        res1.status(500).json({
            error : err
        })
    })
    
});



module.exports = router
