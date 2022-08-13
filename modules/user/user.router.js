const express = require("express");
const { auth } = require("../../middlwear/auth");
const path = require('path')

const validation = require("../../middlwear/validation");
const  profileController  = require("./controller/profile");
const endPoint = require("./user.endPoint");
const validators = require("./user.validation")
const {myMulter, fileValidation, HME} = require("../../servieces/multer")
const router = express.Router();


// get all users
router.get('/getAllUser',profileController.getAllUsers)
//get profile
router.get('/profile',validation(validators.displayProfile),auth(endPoint.displayprofile),profileController.displayProfile)
// profile photo
router.patch('/profile/pic',myMulter('user/profile/pic',fileValidation.image).array('image',2),auth(endPoint.displayprofile),profileController.profilePIc)
// profile cover
router.patch('/profile/covPic',myMulter('user/profile/cover',fileValidation.image).array('image',5),HME,auth(endPoint.displayprofile),profileController.coverPIC)

module.exports = router