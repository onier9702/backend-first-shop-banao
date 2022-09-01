
/*
{
    name: 'Onier',
    email: "correo@gmail.com",
    password: '123456',
    img: 'jsafnj,adn',
    role: 'sajasdnj',
    state: true | false,
}
*/

const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    mobile: {
        type: String,
        required: [ true, 'Celular is obligated' ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: [true, 'Role is required'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, state, ...user } = this.toObject();
    user.uid = _id;
    return user;
} 

module.exports = model( 'User', UserSchema );
