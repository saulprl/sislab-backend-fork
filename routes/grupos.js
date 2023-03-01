const { Router } = require('express');
const { check } = require('express-validator');

const {
  crearGrupo,
  obtenerGrupos,
  obtenerGrupo,
  actualizarGrupo,
  borrarGrupo,
} = require('../controllers/grupos');

const { existeGrupoPorId } = require('../helpers/db-validators');

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
    check('nombre', 'El nombre del grupo es obligatorio').not().isEmpty(),
    check('laboratorio', 'El laboratorio es obligatorio').not().isEmpty(),
    check('carrera', 'La carrera es obligatoria').not().isEmpty(),
    check('materia', 'La materia es obligatoria').not().isEmpty(),
    check('alumnos', 'El numero de alumnos tiene que ser por lo menos de uno')
      .notEmpty()
      .isInt({ min: 1, max: 30 }),
    check('equipos', 'El numero de equipos tiene que ser por lo menos de uno')
      .notEmpty()
      .isInt({ min: 1, max: 30 }),
    check('dia', 'El dia de la semana es obligatorio').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),

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
