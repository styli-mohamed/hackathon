const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user_controller');


router.get('/' , (req , res) =>{
    return res.status(200).send(userControllers.addUserProfile({}));
});

router.post('/addprofile' ,async (req , res) =>{
    const {profile} = req.body;
    const response = {};
    profile.uid = '1';
    await userControllers.addUserProfile({profile:profile});
    response.status = 200;
    response.data = 'Profile Created Successfully';
    return res.status(200).send(response);
});

router.post('/updateprofile' ,async (req , res) =>{
    const {profile} = req.body;
    const response = {};
    profile.uid = '1';
    await userControllers.updateUserProfile({profile:profile});
    response.status = 200;
    response.data = 'Profile Updated Successfully';
    return res.status(200).send(response);
});

router.get('/fetchprofiles' ,async (req , res) =>{
    const response = {};
    const profilesData = await userControllers.fetchUserProfiles();
    response.status = 200;
    response.data = profilesData;
    return res.status(200).send(response);
});

router.post('/removeprofile' ,async (req , res) =>{
    const {profile} = req.body;
    const response = {};
    profile.uid = '1';
    await userControllers.deleteUserProfile({profile:profile});
    response.status = 200;
    response.data = 'Profile Deleted Successfully';
    return res.status(200).send(response);
});

module.exports = router;