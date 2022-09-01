
const { response } = require("express");
const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const User = require('../models/user');
const Product = require('../models/product');


const handleImageCloudinary = async(req, res = response) => {

    try {

        const { collection, id } = req.params;

        let model;

        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if( !model ){
                    return res.status(400).json({ msg: `Usuario ID: ${id} no existe ` });
                }
                break;

            case 'products':
                model = await Product.findById(id)
                if( !model ){
                    return res.status(400).json({ msg: `Producto ID: ${id} no existe` });
                }
                break;
        
            default:
                return res.status(500).json({ msg: 'Olvide validar esto en mi backend' });
        };

        
        if ( collection === 'products' ){
            
            // let { file1, file2, file3 } = req.files;
            // console.log(req.files);
            let imgsFiles = [req.files.file1, req.files.file2, req.files.file3];
            let imgs      = [model.img1 , model.img2 , model.img3];
            let c = 0;
            
            for ( let i of imgsFiles ){
                
                if (i){
                    if ( imgs[c] ){
                        // delete img from server to avoid duplicates
                        let nameArr = imgs[c].split('/');
                        let name    = nameArr[ nameArr.length - 1 ];
                        let [ public_id ]    = name.split('.');
                        cloudinary.uploader.destroy(public_id);
                    };
                    // Upload image to cloudinary
                    let { tempFilePath } = i; // file uploaded for user
                    let {secure_url} = await cloudinary.uploader.upload(tempFilePath);
                    
                    if ( c === 0){
                        model.img1 = secure_url;
                    } else if ( c === 1){
                        model.img2 = secure_url;
                    } else {
                        model.img3 = secure_url;
                    }
    
                };
                c += 1;
            };
        } else {
            if (model.img){
                //destroy img to avoid duplicates
                let nameArr = model.img.split('/');
                let name    = nameArr[ nameArr.length - 1 ];
                let [ public_id ]    = name.split('.');
                cloudinary.uploader.destroy(public_id);
            };
            // Upload image to cloudinary
            let { tempFilePath } = req.files.file1; // file uploaded for user
            let {secure_url} = await cloudinary.uploader.upload(tempFilePath);
            model.img = secure_url;
        };
    
        await model.save();   // save img on database

        if (collection === 'users'){
            return res.status(200).json({
                model
            });
        };

        const prod = await Product.findById(id)
                                    .populate('user', 'name')
                                    .populate('category', 'name');

        res.status(200).json({
            model: prod
        });

    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error subiendo o actualizando img, reintente o contacte Admin +53 54474824'
        });
    }
};

// controller show up an image
const showImage = async( req, res = response ) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({ msg: `Usuario ID: ${id} no existe ` });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if( !model ){
                return res.status(400).json({ msg: `Producto ID: ${id} no existe` });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Olvide esta collection en mi backend' });
    }

    // checking if exists any image
    if (model.img){
        const resp = await Product.findById(id);
        if (resp){
            return res.status(200).json({img: resp.img});
        } else {
            const response = await User.findById(id);
            return res.status(200).json({img: response.img});
        }
    };

    const pathNotFoundImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNotFoundImg);

};

module.exports = {
    handleImageCloudinary,
    showImage
}