

const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

const permittedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUserOnDB = async( terminus = '', res = response) => {

    const isMongoId = ObjectId.isValid( terminus ); // Mongo return true or false

    //  here terminus is a ID
    if ( isMongoId ){
        const user = await User.findById(terminus);
        return res.json({
            results: (user) ? [ user ] : []
        });
    };

    // find regular expresions
    const regex = new RegExp(terminus, 'i');

    // here terminus is a name
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    })
};

const searchCategoryOnDB = async( terminus = '', res = response) => {

    const isMongoId = ObjectId.isValid( terminus ); // Mongo return true or false

    //  here terminus is a ID
    if ( isMongoId ){
        const category = await Category.findById(terminus);
        return res.json({
            results: (category) ? [ category ] : []
        });
    };

    // find regular expresions
    const regex = new RegExp(terminus, 'i'); 

    // here terminus is a name
    const categories = await Category.find({ name: regex, state: true })
                                        .populate('user', 'name');
                                                

    res.json({
        results: categories
    });
};

const searchProductOnDB = async( terminus = '', res = response) => {

    const isMongoId = ObjectId.isValid( terminus ); // Mongo return true or false

    //  here terminus is a ID
    if ( isMongoId ){
        const product = await Product.findById(terminus)
                                        .populate('category', 'name');
                                        
        return res.json({
            results: (product) ? [ product ] : []
        });
    };

    // find regular expressions
    const regex = new RegExp(terminus, 'i'); 

    // here terminus is a name
    const products = await Product.find({ name: regex, state: true })
                                    .populate('category', 'name');
                                    

    res.json({
        results: products
    });
};

const searchController = (req, res = response) => {

    const { collection, terminus } = req.params;

    if ( !permittedCollections.includes(collection) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son solo estas: [ ${permittedCollections} ]`
        });
    };

    switch (collection) {
        case 'users':
            searchUserOnDB(terminus, res);
        break

        case 'categories':
            searchCategoryOnDB(terminus, res);
        break

        case 'products':
            searchProductOnDB(terminus, res);
        break

        default:
            res.status(500).json({
                msg: 'Olvide implementar esta busqueda'
            })
    };

};

module.exports = {
    searchController   
}

