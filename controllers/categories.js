
const { response } = require("express");
const Category = require('../models/category');

const getAllCategories = async(req, res = response) => {

    try {

        const { limit , since } = req.query;
    
        const query = {state: true};
        
        const [ total, categories ] = await Promise.all([ 
            Category.countDocuments(query),
            Category.find(query)
                    .skip(since)
                    .limit(limit)
        ]);
    
        res.status(200).json({
            total,
            categories
        })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

const createCategory = async(req, res = response) => {

    try {

        const name = req.body.name;
    
        const categoryDB = await Category.findOne({ name });
    
        if ( categoryDB ) {
            return res.status(400).json({
                msg: `Categoria ${categoryDB.name} ya existe en Base Datos, entre otra o use esta`
            });
        };
    
        // Generate Data
        const data = {
            name,
        };
    
        const category = new Category(data);
    
        // Save on DB
        await category.save();
    
        res.status(201).json({category});
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

// Get one Category by ID
const getCategoryByID = async( req, res = response ) => {

    try {

        const {id} = req.params;
    
        const categoryDB = await Category.findById(id)
    
        if(!categoryDB.state){
            return res.status(401).json({
                msg: 'Esta Categoria ya no existe'
            });
        };
    
        res.status(200).json({
            category: categoryDB,
        })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }

};

const updatingCategory = async(req, res = response) => {

    try {

        const {id} = req.params;        
        const { state, user , ...data} = req.body;
    
        data.name = data.name.toUpperCase();
        data.user = req.user._id;
    
        const categ = await Category.findByIdAndUpdate(id, data, {new: true})
    
        res.status(200).json({
            category: categ
        })
        
    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            msg: 'Contacte al Administrator +53 54474824'
        });
    }
};

const deleteOneCategory = async(req, res = response) => {


    const {id} = req.params;

    // Deleting not physically so changing state to false
    const catDeleted = await Category.findByIdAndUpdate(id, {state: false}, {new: true})

    res.json({
        deleted: catDeleted
    });
};

module.exports = {
    getAllCategories,
    createCategory,
    updatingCategory,
    deleteOneCategory,
    getCategoryByID
}
