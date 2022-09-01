


const {Schema, model} = require('mongoose');


const CategorySchema = Schema({

    name: {
        type: String,
        required: [true, 'Nombre de Categoria es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },

});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, state, ...data } = this.toObject();
    data.id = _id;
    return data;
};


module.exports = model('Category', CategorySchema);







