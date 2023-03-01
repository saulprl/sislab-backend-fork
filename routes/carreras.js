const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCampos,
} = require('../middlewares');

const {
  existeUsuarioPorId,
} = require('../helpers/db-validators');

const {
  usuarioGet,
  usuariosGet,
} = require('../controllers/usuarios');

const router = Router();

router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioGet
);

router.get('/', usuariosGet);

module.exports = router;