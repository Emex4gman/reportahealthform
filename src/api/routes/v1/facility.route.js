const express = require("express");
const router = express.Router();

const { validate } = require('express-validation')
const facilityController = require('../../controllers/facility.controller')
const { register, login } = require('../../validation/auth.validation')
const { authenticate, authorize, ADMIN, USER } = require('../../middlewares/jwtmiddleware')
const { parser } = require('../../middlewares/multer')
router.route("/").post(authenticate, parser.any(), facilityController.saveFacility)
router.route('/user').get(authenticate, authorize(USER), facilityController.getUserFacilities)
router.route('/').get(authenticate, authorize(ADMIN), facilityController.getAllFacility)
router.route('/:id').patch(authenticate, authorize(USER), facilityController.updateFacility)



module.exports = router;