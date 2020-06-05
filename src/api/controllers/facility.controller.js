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
    let humanResources = body.humanResources ? JSON.parse(body.humanResources) : {}
    let cacImageUrl = ""
    let profileImageUrl = ""
    let services = JSON.parse(body.services)
    let daysOfOperations = JSON.parse(body.daysOfOperations)
    let specilizations = JSON.parse(body.specilizations)

    for (let index = 0; index < files.length; index++) {
      if (files[index].fieldname === 'profile') {
        profileImageUrl = 'images/' + files[index].filename
      }
      if (files[index].fieldname === 'cac') {
        cacImageUrl = 'images/' + files[index].filename
      }
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
    let newFacility = await new Facility({
      ...body,
      sig_unique_id,
      user: id,
      humanResources,
      cacImageUrl,
      profileImageUrl,
      services,
      daysOfOperations,
      specilizations
    });
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
    let humanResources = body.humanResources ? body.humanResources : {}
    let _id = mongoose.Types.ObjectId(req.params.id)

    // find if the fasility exist, 
    let foundFacility = await Facility.findById(_id);
    if (!foundFacility) {
      let error = new Error("No record found")
      error.statusCode = httpStatus.NOT_FOUND
      throw error;
    }
    //validate the  user
    if (userId.toString() !== foundFacility.user.toString()) {
      let error = new Error("You are not authoried to make any changes")
      error.statusCode = httpStatus.UNAUTHORIZED
      throw error;

    }
    //spread the old file
    await foundFacility.update({ ...body, humanResources });
    await foundFacility.save()

    // update with the new data
    res.status(httpStatus.CREATED).json({
      message: "Facility updated",
    })

  } catch (error) {
    next(error)
  }


}

exports.updateFacilityImages = async (req, res, next) => {
  try {

    let files = req.files
    let userId = req.userId
    let _id = mongoose.Types.ObjectId(req.params.facId)

    // find if the fasility exist, 
    let foundFacility = await Facility.findById(_id);
    if (!foundFacility) {
      let error = new Error("No record found")
      error.statusCode = httpStatus.NOT_FOUND
      throw error;
    }
    //validate the  user
    if (userId.toString() !== foundFacility.user.toString()) {
      let error = new Error("You are not authoried to make any changes")
      error.statusCode = httpStatus.UNAUTHORIZED
      throw error;
    }
    let cacImageUrl = foundFacility.cacImageUrl || "";
    let profileImageUrl = foundFacility.profileImageUrl
    for (let index = 0; index < files.length; index++) {
      if (files[index].fieldname === 'profile') {
        profileImageUrl = "images/" + files[index].filename
      }
      if (files[index].fieldname === 'cac') {
        cacImageUrl = "images/" + files[index].filename
      }
    }
    //spread the old file
    await foundFacility.update({
      cacImageUrl, profileImageUrl
    });
    await foundFacility.save()

    // update with the new data
    res.status(httpStatus.CREATED).json({
      message: "Facility images updated",
    })
  } catch (error) {
    next(error)
  }
}