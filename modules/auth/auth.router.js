const express = require("express");
const registration = require("./controller/registration");
const validation = require('../../middlwear/validation')
const validators = require('./auth.validation')
const router = express.Router();
const { auth } = require("../../middlwear/auth");
const endPoint = require("./auth.endPoint")

// signup
router.post('/signup',validation(validators.signup),registration.signup)
// confirm email
router.get('/confirmEmail/:token',validation(validators.confirmEmail),registration.confirmEmail)
// refresh email 
router.get('/refreshEmail/:id',registration.refreshEmail)
// login
router.post('/login',validation(validators.login),registration.login)
//logout
router.patch("/logout",auth(endPoint.logout) ,registration.logOut)

// forget
router.post("/sendCode", validation(validators.sendCode), registration.sendCode)
router.post("/forgetPassword",validation(validators.forgetPassword),registration.forgetPassword)

module.exports = router