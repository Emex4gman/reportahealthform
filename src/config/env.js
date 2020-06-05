const path = require("path");

// import .env variables
require("dotenv-safe").load({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  // sample: path.join(__dirname, "../../.env.example"),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    sgMailKey: process.env.SENDGRID_API_KEY,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
  // cloudinaryConfig: {
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // },
  // adminDetails: {
  //   email: process.env.ADMIN_EMAIL,
  //   password: process.env.ADMIN_PASSWORD,
  // },
  // adminDetails2: {
  //   email: process.env.ADMIN_EMAIL2,
  //   password: process.env.ADMIN_PASSWORD2,
  // },
  // firebaseAdmin: {
  //   credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  // }, 
};
