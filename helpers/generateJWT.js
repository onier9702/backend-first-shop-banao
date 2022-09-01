

const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', name = '') => {

    return new Promise( (resolve, reject) => {

        const payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('Could not generate jwt');
            } else {
                resolve(token);
            }

        })

    } );

};

module.exports = generateJWT;
