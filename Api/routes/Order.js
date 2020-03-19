const express = require('express');
const router = express.Router();


router.get('/',(req,res,next) => {
    res.status(200).json({
        messsage : 'All orders'
    })
});

router.get('/:orderId',(req,res,next) => {
    res.status(200).json({
        messsage : 'a single order',
        id : req.params.orderId
    })
});

router.patch('/:orderId',(req,res,next) => {
    res.status(200).json({
        messsage : 'a single order updated',
        id : req.params.orderId
    })
});

router.delete('/:orderId',(req,res,next) => {
    res.status(200).json({
        messsage : 'a single order deleted',
        id : req.params.orderId
    })
});


router.post('/',(req,res,next) => {
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        messsage : 'Order was created',
        createdOrder : order
    })
});


module.exports = router
