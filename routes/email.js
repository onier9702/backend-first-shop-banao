
const {Router} = require('express');

const { emailController } = require('../controllers/email');

const router = Router();

/*
    Here path is: /api/email
*/

router.post('/', emailController);


module.exports = router;