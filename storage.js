const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    // limits: { fileSize: 5000000000000000000 }, // Set a file size limit (in this example, 1MB)
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
}).single('image');

// Check file type
// function checkFileType(file, cb) {
//     // Allowed file extensions
//     const filetypes = /jpeg|jpg|png/;
//     // Check the extension
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check the MIME type
//     const mimetype = filetypes.test(file.mimetype);
//
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images only! (JPEG, JPG, PNG)');
//     }
// }

module.exports = {
    upload: upload,
    // checkFileType: checkFileType
};