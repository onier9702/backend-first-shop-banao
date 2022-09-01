const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


// Getting All users
const userGetController = async( req, res = response ) => {

    try {
        
        const { limit, since} = req.query;
        const query = { state: true };
    
        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                    .skip(since)
                    .limit(limit)
        ]);
    
        res.status(200).json({
            total,
            users
        });

    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

// Get One User By id
const userGetOneById = async( req, res = response ) => {

    try {
        
        const {id} = req.params;
    
        const user = await User.findById(id);
        if (!user.state){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario fue borrado anteriormente y ya no existe'
            });
        };
    
        res.status(200).json({
            user
        });

    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};


// Update an User
const userUpdateController = async( req, res = response) => {

    try {

        const { id } = req.params;
        const { _id, password, email, role, state, ...rest } = req.body;
    
        if ( password ) {   // user wants to update the password
            // encrypt the password
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        };
        
        const user = await User.findByIdAndUpdate(id, rest, {new: true});
        // console.log(user);
        res.status(200).json({
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

// Delete an User
const userDeleteController = async( req, res = response) => {

    try {

        const { id } = req.params;
    
        const userDeleted = await User.findByIdAndUpdate(id, { state: false }, {new: true} );
    
        res.status(200).json({
            userDeleted
        })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

module.exports = {
    userGetController,
    userUpdateController,
    userDeleteController,
    userGetOneById,
}