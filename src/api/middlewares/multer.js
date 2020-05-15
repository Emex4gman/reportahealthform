var cloudinary = require('cloudinary');
const { cloudinarConfig } = require('../../config/cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png'],
});

const parser = multer({ storage });

exports.parser = parser;