require("dotenv-safe").config();
const nodemailer = require("nodemailer");
const env = process.env;
const Email = require("email-templates");
const path = require("path");
const logger = require("../../config/logger");

const transporter = nodemailer.createTransport({
  host: env.SENDGRID_API_HOST,
  port: "465",
  auth: {
    user: env.SENDGRID_API_USERNAME,
    pass: env.SENDGRID_API_PASSWORD,
  },
  secure: true,
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    logger.error("Email error: ", error);
  } else {
    logger.info("Email provider setup is successful");
  }
});

const tamplateRoot = path.join(__dirname, "/emails");
exports.sendWelcomeEmail = async (user) => {
  const email = new Email({
    views: {
      root: tamplateRoot
    },
    message: {
      from: '"Reporta Health" <support@reportahealth.com>',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "welcomeMessage",
      message: {
        to: user.email,
      },
      locals: {
        productName: "Reporta Health",
        // name: user.name,
      },
    })
    .catch((err) => logger.info("error sending welcome message email", err));
};

exports.sendUpdateFacilityEmail = async (facility, userEmail) => {
  const email = new Email({
    views: {
      root: tamplateRoot
    },
    message: {
      from: '"Reporta Health" <support@reportahealth.com>',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "updateFacility",
      message: {
        to: `${facility.fac_email}, ${userEmail}`,
      },
      locals: {
        productName: "Reporta Health",
        facilityName: facility.reg_fac_name,
      },
    })
    .catch((err) => logger.info("error sending update facility email", err));
};

exports.sendNewFacilityEmail = async (facility, userEmail) => {
  const email = new Email({
    views: {
      root: tamplateRoot
    },
    message: {
      from: '"Reporta Health" <support@reportahealth.com>',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "newFacilty",
      message: {
        to: `${facility.fac_email}, ${userEmail}`,
      },
      locals: {
        productName: "Reporta Health",
        facilityName: facility.reg_fac_name,
      },
    })
    .catch((err) => logger.info("error sending new facility email", err));
};