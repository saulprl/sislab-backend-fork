const { Router } = require('express');
const horariosGet = require('../controllers/horas');
const router = Router();

router.get('/', horariosGet);

module.exports = router;
