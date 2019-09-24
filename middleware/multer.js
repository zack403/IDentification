const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.match(/jpeg|jpeg|png|gif$i/)) {
            cb(new Error('File is not supported'), false)
        }
        cb(null, true)
    }
})
