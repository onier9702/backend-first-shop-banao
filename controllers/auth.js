
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const generateJWT = require('../helpers/generateJWT');


// Register
const register = async(req, res = response) => {

    try {

        const { name, email, password, mobile } = req.body;

        const userEmail = await User.findOne({ email });
        if ( userEmail ) {
            return res.status( 401 ).json({
                ok: false,
                msg: `User with email: ${email} already exists`
            })
        }

        const data = {
            name,
            email,
            password,
            mobile,
            role: 'USER_ROLE'
        }

        const user = new User( data );
    
        // encrypt the password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    
        //save on DB
        await user.save();

        const newUserDB = await User.findOne( {email} );

        // generateJWT
        const token = await generateJWT( newUserDB.id, newUserDB.name );
    
        res.status(201).json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contact Administrator'
        })
    }

}

// Login
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne( {email} );
        // verify if email exists
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are not valid -email'
            })
        };
        // verify if user is active on DB
        if (!user.state) {
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are not valid -state: false'
            })
        };
        // verify if password is correct
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are not valid -password'
            })
        }
        //verify JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something was wrong, please contact Admin'
        })
    }
};

const revalidateToken = async( req, res = response) => {

    try {

        const { id, name } = req.user;
        // console.log(req.user);
        const userDB = await User.findById(id);
    
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist on database'
            });
        };
    
        // generate new JWT
        const token = await generateJWT( id, name );
    
        return res.status(200).json({
            ok: true,
            user: userDB,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something was wrong, please contact Admin'
        })
    }


}

module.exports = {
    register,
    login,
    revalidateToken
}