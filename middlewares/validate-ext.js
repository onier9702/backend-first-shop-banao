

// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

const { response } = require("express");

const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const validateExt = ( req, res = response, next  ) => {

    const { file1, file2, file3 } = req.files;
    
    if ( file1 ){
        let cutFile = file1.name.split('.');
        let extension = cutFile[cutFile.length - 1];
    
        if ( !validExtensions.includes(extension) ){
            return res.status(400).json({
                msg: `Extension ${extension} no se permite, solo estas [ ${validExtensions} ] son permitidas`
            });
        };   
    };

    if ( file2 ){
        let cutFile = file2.name.split('.');
        let extension = cutFile[cutFile.length - 1];
    
        if ( !validExtensions.includes(extension) ){
            return res.status(400).json({
                msg: `Extension ${extension} no se permite, solo estas [ ${validExtensions} ] son permitidas`
            });
        };   
    };

    if ( file3 ){
        let cutFile = file3.name.split('.');
        let extension = cutFile[cutFile.length - 1];
    
        if ( !validExtensions.includes(extension) ){
            return res.status(400).json({
                msg: `Extension ${extension} no se permite, solo estas [ ${validExtensions} ] son permitidas`
            });
        };   
    };

    next();
};

// const nameFile = ( files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'] ) => {

//     return new Promise( (resolve, reject) => {

//         const { file } = files;
//         const cutFile = file.name.split('.');
//         const extension = cutFile[cutFile.length - 1];
    
//         if ( !validExtensions.includes(extension) ){
//             return reject(`Extension ${extension} no se permite, solo estas [ ${validExtensions} ] son permitidas`);
//         };
    
//         const temporaryName = uuidv4() + '.' + extension;
//         // const uploadPath = path.join(__dirname, '../uploads/', folder, temporaryName);
      
//         resolve( temporaryName );

//         file.mv(uploadPath, (err) => {
    
//             if (err) {
//                 reject(err);
//             };
      
//         });

//     } );

// };

module.exports = {
    validateExt
}