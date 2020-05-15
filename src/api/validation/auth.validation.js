const { Joi } = require('express-validation')
module.exports = {
  // POST /v1/auth/register
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
    }),
  },

  // POST /v1/auth/login
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    }),
  },


  // POST /v1/auth/password-reset
  updatePassword: {
    body: Joi.object({
      oldPassword: Joi.string().required().min(6).max(128),
      newPassword: Joi.string().required().min(6).max(128),
    }),
  },
};
