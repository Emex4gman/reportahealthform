const Facility = require('../models/facility.model')
const mongoose = require('mongoose')
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
    next(error)
  }
}
exports.saveFacility = async (req, res, next) => {
  try {
    let body = req.body
    let id = req.userId
    let sig_unique_id = uuid()
    let files = req.files
    let images = [];
    let humanResources = body.humanResources ? JSON.parse(body.humanResources) : {}

    for (let index = 0; index < files.length; index++) {
      images.push({ [files[index].fieldname]: files[index].url })
    }

    /**
     * catter for an already regsiterfacility
     */

    let foundFacility = await Facility.findOne({ reg_fac_name: body.reg_fac_name });
    if (foundFacility) {
      let error = new Error('This facility is already registered')
      error.statusCode = httpStatus.CONFLICT;
      throw error;
    }
    let newFacility = await new Facility({ ...body, sig_unique_id, user: id, images: images, humanResources });
    await newFacility.save();
    res.status(httpStatus.CREATED).json({
      messsage: "Facility created",
      data: { newFacility },
    })
  } catch (error) {
    console.log(error)
    next(error)

  }
}

exports.updateFacility = async (req, res, next) => {
  try {
    let body = req.body
    let userId = req.userId
    let humanResources = body.humanResources ? JSON.parse(body.humanResources) : {}
    let _id = mongoose.Types.ObjectId(req.params.id)

    // find if the fasility exist, 
    let foundFacility = await Facility.findById(_id);
    if (!foundFacility) {
      let error = new Error("No record found")
      error.statusCode = httpStatus.NOT_FOUND
      throw error;
    }
    //validate the  user
    // if (userId !== foundFacility.userId) {
    //   let error = new Error("You are not authoried to make any changes ")
    //   error.statusCode = httpStatus.UNAUTHORIZED
    //   throw error;
    // }
    //spread the old file
    await foundFacility.update({ ...body, humanResources });
    await foundFacility.save()

    // update with the new data
    res.status(httpStatus.CREATED).json({
      messsage: "Facility updated",
    })

  } catch (error) {
    next(error)
  }


}