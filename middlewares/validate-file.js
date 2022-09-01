
const { response } = require("express");

const validateFile = (req, res = response, next) => {

    // req.files is from express-uploadfile library and file is the file that user have to upload
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file1 ) {
        return res.status(400).json({ msg: 'No se subieron fotos !!!'}); 
    };

    next();

};

module.exports = {
    validateFile
}