const { Router } = require('express');
const horariosGet = require('../controllers/horarios');
const router = Router();

router.get('/', horariosGet);

module.exports = router;