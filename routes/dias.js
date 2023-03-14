const { Router } = require('express');
const diasGet = require('../controllers/dias');
const router = Router();

router.get('/', diasGet);

module.exports = router;