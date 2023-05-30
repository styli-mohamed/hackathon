const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category_controllers');
const categoryListJSON = require('../response_structures/category_list.json');


router.post('/list', async (req, res) => {
    const response = {};
    const trendingCatObj = {
        "_meta": {
            "name": "mobile-category-banner",
            "schema": "https://www.amplience.com/emax/lmgbanner.json",
            "deliveryId": "c19948ca-2b39-436b-9f6d-6239c6feecfd"
        },
        "desktopImage": {
            "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
            },
            "id": "f1c73c83-0fa6-42ca-8d58-68b44191b0c8",
            "name": "Mobile-Acc-Brand-Logos_141112",
            "endpoint": "emax",
            "defaultHost": "cdn.media.amplience.net"
        },
        "mobileImage": {
            "_meta": {
                "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
            },
            "id": "f1c73c83-0fa6-42ca-8d58-68b44191b0c8",
            "name": "Mobile-Acc-Brand-Logos_141112",
            "endpoint": "emax",
            "defaultHost": "cdn.media.amplience.net"
        },
        "isAnimatedImage": false,
        "urlLinkList": [
            "/department/mobile"
        ],
        "linkTextList": [
            "/shop-mxwomen-shoes"
        ],
        "bannerTitle": "Mobiles & Mobile accessories",
        "bannerType": "GRAPHICAL",
        "deskAspectRatio": "1:1",
        "mobAspectRatio": "1:1",
        "deliveryId": "5e6f6f38-6067-4a75-b49a-b3e7115be3aa"
    };
    const { catData } = req.body;
    const catList = await categoryController.categoriesList({ catdata: catData });
    for(const cat of catList){
        trendingCatObj.bannerTitle = cat.name;
        trendingCatObj.deliveryId = cat.id;
        categoryListJSON.content.slots[0].contentTypes[0].trendingBanners.push(trendingCatObj);
    }   
    response.status = 200;
    response.data = categoryListJSON;
    return res.status(200).send(response);

});

router.post('/add', async (req, res) => {
    const response = {};
    const { catData } = req.body;
    const catList = await categoryController.addCategory({ catdata: catData });
    response.status = 200;
    response.data = "Added Category";
    return res.status(200).send(response);

});

module.exports = router;