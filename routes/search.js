
const {Router} = require('express');

const { searchController } = require('../controllers/search');
const router = Router();

/*
    Here path is: /api/search
*/

router.get('/:collection/:terminus', searchController);


module.exports = router;