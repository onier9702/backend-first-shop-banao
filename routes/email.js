
const {Router} = require('express');

const { emailController } = require('../controller/emailController');

const router = Router();

/*
    Here path is: /api/email
*/

router.post('/', emailController);


module.exports = router;