
const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { register, login, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// Register User
router.post('/new',
            [
                check('name', 'Name is obligated').not().isEmpty(),
                check('email', 'Email is obligated').isEmail(),
                check('mobile', 'Celular should have at least 8 numbers').isLength({min: 8}),
                check('password', 'Password shoul have at least 6 characters').isLength({min: 6}),
                validateFields
            ],
            register
);

// Login User
router.post('/login',
            [
                check('email', 'Email is obligated').isEmail(),
                check('password', 'Password is required').not().isEmpty(),
                validateFields
            ],
            login
);

// Revalidate Token
router.get('/renew', validateJWT, revalidateToken );


module.exports = router;
