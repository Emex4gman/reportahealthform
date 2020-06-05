const multer = require('multer');
const path = require('path')


const destinationPath = path.join(process.cwd(), '/public/images')
// console.log(destinationPath)
const serverStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath)
  },
  filename: function (req, file, cb) {

    cb(null, file.fieldname + '_' + req.userId + '.' + file.originalname.split('.')[1])
  }
});
const parser = multer({ storage: serverStore });

exports.parser = parser;