
const User = require('../models/user');
const Role = require('../models/role');
const Category = require('../models/category');
const Product = require('../models/product');


const emailExists = async(email = '') => {

    const thereIsEmail =  await User.findOne( {email} );
    if ( thereIsEmail ){
        throw new Error(` ${email} ya ha sido utilizado`);
    }

};

const isValidRole =  async(role = '') => {

    // console.log('Inside isValidRole');
    const existsRole = await Role.findOne({role});
    if (!existsRole) {
        throw new Error(`Rol ${role} not registered on database`);
    }
};

const idExists = async(id = '') => {

    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(` Este usuario Id no existe en base de datos`);
    }
};

const existsCategory = async( id = '' ) => {

    const category = await Category.findById(id);

    if ( !category ){
        throw new Error('Esa Categoria no existe en base datos');
    };
};

const existsProduct = async( id = '' ) => {

    const category = await Product.findById(id);

    if ( !category ){
        throw new Error('Ese producto no existe en Base Datos');
    };
};

// Validate allowed collections
const allowedCollections = ( collection = '', arrColl = [] ) => {

    const isIn = arrColl.includes(collection);

    if ( !isIn ){
        throw new Error(`Error, colecciones permitidas son estas [ ${arrColl} ]`);
    };

    return true;
}

module.exports = {
    emailExists,
    isValidRole,
    idExists,
    existsCategory,
    existsProduct,
    allowedCollections
}