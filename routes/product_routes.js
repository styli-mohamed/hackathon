const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product_controllers');
const sizeControllers = require('../controllers/size_map_controller');

router.post('/add' ,async (req , res) =>{
    const {product} = req.body;
    const response = {};
    await productControllers.addProduct({data:product});
    response.status = 200;
    response.data = 'Product Added Successfully';
    return res.status(200).send(response);
});

router.post('/list' ,async (req , res) =>{
    const {category,profile} = req.body;
    const response = {};
    const plp = await productControllers.listProducts({category:category,profile:profile});
    response.status = 200;
    response.data = plp;
    return res.status(200).send(response);
});

router.post('/listRelated' ,async (req , res) =>{
    const {current_product,related_outfits,profile} = req.body;
    const response = {};
    const relatedProducts = await productControllers.listRelated({profile:profile,relateto:related_outfits});
    current_product.outfit_details = [];
    current_product.outfit_details.push(...relatedProducts);
    response.status = 200;
    current_product.preferredSizeN= sizeControllers.sizeMapping({product:current_product,profile:profile});
    response.data = current_product;
    return res.status(200).send(response);
});

router.post('/info' ,async (req , res) =>{
    const {product} = req.body;
    const response = {};
    profile.uid = '1';
    await productControllers.addUserProfile({profile:profile});
    response.status = 200;
    response.data = 'Profile Created Successfully';
    return res.status(200).send(response);
});

router.post('/relate' ,async (req , res) =>{
    const response = {};
    const {main,relate_to} = req.body;
    await productControllers.addProductToOutFit({from:main,relateto:relate_to});
    response.status = 200;
    response.data = 'Product added to outfit';
    return res.status(200).send(response);
});

module.exports = router;