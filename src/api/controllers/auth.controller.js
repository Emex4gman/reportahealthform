const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { signWithJwt } = require('../middlewares/jwtmiddleware');
const httpStatus = require('http-status');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body.email

    let exsitingUser = await User.findOne({ email })
    if (exsitingUser) {
      const error = new Error("This E-Mail already exist!!");
      error.statusCode = httpStatus.CONFLICT
      throw error;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    let newUser = await User({
      email,
      password: hashpassword
    }).save()

    let token = await signWithJwt(newUser)
    res.status(httpStatus.CREATED).json({
      messsage: "Account created",
      data: {
        token: token,
        user: newUser
      },
    })

  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let foundUser = await User.findOne({ email })
    if (!foundUser) {
      const error = new Error("Email not found")
      error.statusCode = 401
      throw error

    }

    const isEqual = await bcrypt.compare(password, foundUser.password)
    if (!isEqual) {
      const error = new Error('worng password')
      error.statusCode = 240;
      throw error

    }
    let token = await signWithJwt(foundUser)
    res.status(httpStatus.ACCEPTED).json({
      messsage: "login success",
      data: {
        token: token,
        user: foundUser
      },
    })
  } catch (error) {
    next(error)
  }
}