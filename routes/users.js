
const {Router} = require('express');
const { check } = require('express-validator');

const { userGetController, userUpdateController, userDeleteController, userGetOneById } = require('../controllers/user');
const { emailExists, idExists } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares/validate-role');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// Get all users --private , just Admin can do this
router.get('/', [
    validateJWT,
    isAdminRole
    ],
    userGetController
);

// Get an user by ID --public
router.get('/:id', [
    check('id', 'Este ID no es valido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
    ],
    userGetOneById
);

// Update an user --private by ID
router.put('/:id', [
    validateJWT,
    check('id', 'Este ID no es valido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
    ],
    userUpdateController
);

// Delete an user --private by ID --Admin Role
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Este ID no es valido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
    ],
    userDeleteController
);

module.exports = router;