const express = require("express");
const router = express.Router();

const { validate } = require('express-validation')
const facilityController = require('../../controllers/facility.controller')
const { register, login } = require('../../validation/auth.validation')
const { authenticate, authorize } = require('../../middlewares/jwtmiddleware')

router.route("/").post(authenticate, facilityController.saveFacility)




module.exports = router;