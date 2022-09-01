
const {Schema, model} = require('mongoose');


const RoleShema = Schema({

    role: {
        type: String,
        required: [true, 'Role is obligated']
    }

});


module.exports = model('Role', RoleShema);