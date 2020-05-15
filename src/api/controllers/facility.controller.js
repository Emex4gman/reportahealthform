const Facility = require('../models/facility.model')
const User = require('../models/user.model')
const httpStatus = require('http-status')


exports.saveFacility = async (req, res, next) => {
  try {
    let id = req.userId
    let role = req.role
    res.send({ id, role })
  } catch (error) {

    next(error)
  }
}