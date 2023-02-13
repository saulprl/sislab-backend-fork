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
    check('laboratorio', 'El laboratorio es obligatorio').not().isEmpty(),
    check('carrera', 'La carrera es obligatorio').not().isEmpty(),
    check('materia', 'La materia es obligatorio').not().isEmpty(),
    check(
      'numAlumnos',
      'El numero de alumnos tiene que ser mayor que uno'
    ).isLength({
      min: 1,
    }),
    check(
      'numEquipos',
      'El numero de equipos tiene que ser mayor que uno'
    ).isLength({
      min: 1,
    }),
    check('diaSemana', 'El dia de la semana es obligatorio').not().isEmpty(),
    check('horaInicial', 'La hora inicial es obligatoria').not().isEmpty(),
    check('horaFinal', 'La hora fianl es obligatoria').not().isEmpty(),
    check('grupos').custom(existeGrupoPorId),
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
