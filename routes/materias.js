const { Router } = require('express');
const materiasGet = require('../controllers/materias');
const router = Router();

router.get('/', materiasGet);

module.exports = router;