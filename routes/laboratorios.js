const { Router } = require('express');
const laboratoriosGet = require('../controllers/laboratorios');
const router = Router();

router.get('/', laboratoriosGet);

module.exports = router;