


const {Router} = require('express');
const { check } = require('express-validator');

const { getAllCategories, createCategory, getCategoryByID, updatingCategory, deleteOneCategory } = require('../controllers/categories');
const { existsCategory } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares/validate-role');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');


const router = Router();

/// Getting all categories -public
router.get('/', getAllCategories );

// Create category, any user with a valid token and SALE_ROLE -private
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre de la Categoria es obligatorio' ).not().isEmpty(),
    validateFields
    ],
    createCategory
);


// Getting a category by id - it is public as well
router.get('/:id', [
    check('id', 'Esto no es un ID valido en MondoDB').isMongoId(),
    check('id').custom( existsCategory ),
    validateFields
    ],
    getCategoryByID
);


// Update Category by id  -private
router.put('/:id', [
    validateJWT,
    check('name', "Nombre es obligatorio para actualizar").not().isEmpty(),
    check('id', 'Esto no es un ID valido en MondoDB').isMongoId(),
    check('id').custom( existsCategory ),
    validateFields
    ],
    updatingCategory
);

// Delete a category by ID -private- just an Admin user
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'This is not a mongo ID').isMongoId(),
    check('id').custom( existsCategory ),
    validateFields
    ],
    deleteOneCategory
);

module.exports = router;