const { Router } = require('express');
const carrerasGet = require('../controllers/carreras');
const router = Router();

router.get('/', carrerasGet);

module.exports = router;