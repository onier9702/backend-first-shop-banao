

const {Router} = require('express');
const { check } = require('express-validator');

const { validateFile } = require('../middlewares/validate-file');
const { showImage, handleImageCloudinary } = require('../controllers/upload');
const { allowedCollections } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateExt } = require('../middlewares/validate-ext');

const router = Router();

/*
    Here path is: /api/upload
*/

// Get an image of User or Product by ID --public
router.get('/:collection/:id', [
    check('id', 'No es un ID de MongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
    ], 
    showImage
);

// Post or Update an image
router.post('/:collection/:id', [
    validateJWT,
    validateFile,
    validateExt,
    check('id', 'No es un ID de MongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
    ],
    handleImageCloudinary
)


module.exports = router;