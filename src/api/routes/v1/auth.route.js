const express = require("express");
const router = express.Router();

const { validate } = require('express-validation')
const authController = require('../../controllers/auth.controller')
const { register, login } = require('../../validation/auth.validation')


router.route("/register").post(validate(register), authController.register)
router.route("/login").post(authController.login)




module.exports = router;
