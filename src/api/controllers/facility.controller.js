const Facility = require('../models/facility.model')
const User = require('../models/user.model')
const httpStatus = require('http-status')
const uuid = require('uuid').v4

exports.getAllFacility = async (req, res, next) => {
  try {
    let foundFacilities = await Facility.find();
    res.status(httpStatus.OK).json({
      messsage: "Facility retrived",
      data: { foundFacilities },
    })
  } catch (error) {
    next(error)
  }
}

exports.getUserFacilities = async (req, res, next) => {
  try {
    let foundFacilities = await Facility.find({ user: req.userId });
    res.status(httpStatus.OK).json({
      messsage: "Facility retrived",
      data: { foundFacilities },
    })

  } catch (error) {

  }
}
exports.saveFacility = async (req, res, next) => {
  try {
    let body = req.body
    let id = req.userId
    let sig_unique_id = uuid()
    /**
     * catter for an already regsiterfacility
     */

    let foundFacility = await Facility.findOne({ reg_fac_name: body.reg_fac_name });
    if (foundFacility) {
      let error = new Error('This facility is already registered')
      error.statusCode = httpStatus.CONFLICT;
      throw error;
    }
    let newFacility = await new Facility({ ...body, sig_unique_id, user: id }).save();

    res.status(httpStatus.CREATED).json({
      messsage: "Facility created",
      data: { newFacility },
    })
  } catch (error) {

    next(error)
  }
}