const { Router } = require('express');
const { check } = require('express-validator');

const {
  crearGrupo,
  obtenerGrupos,
  obtenerGrupo,
  actualizarGrupo,
  borrarGrupo,
} = require('../controllers/grupos');

const {
  existeGrupoPorId,
  existeCategoriaPorId,
} = require('../helpers/db-validators');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas las grupos - publico
router.get('/', obtenerGrupos);

// Obtener una grupo por id - publico
router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeGrupoPorId),
  ],
  obtenerGrupo
);

// Crear grupo - privado - cualquiera con token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearGrupo
);

// Actualizar una grupo - privado - cualquiera con token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeGrupoPorId),
    validarCampos,
  ],
  actualizarGrupo
);

// Eliminar una grupo - privado - cualquiera con token valido
router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeGrupoPorId),
    validarCampos,
  ],
  borrarGrupo
);

module.exports = router;
