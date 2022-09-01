

const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is not token in petition'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findById(uid);

        if(!user) {
            return res.json({
                msg: 'User does not exists on DB'
            });
        };

        // Verify if user is valid checking his state
        if( !user.state ){
            return res.json({
                msg: 'Token not valid -state: false or user deleted before'
            });
        };

        req.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token not valid'
        })
    }

};


module.exports = {validateJWT};
