const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearGrupo,
  obtenerGrupos,
  obtenerGrupo,
  actualizarGrupo,
  borrarGrupo,
  getGroupsByPeriod,
} = require("../controllers/grupos");

const { existeGrupoPorId } = require("../helpers/db-validators");

const {
  validarJWT,
  validarCampos,
  validateCarrera,
  validateDia,
  validateHora,
  validateLaboratorio,
  validateMateria,
} = require("../middlewares");

const router = Router();

// Obtener todas las grupos - publico
router.get("/", obtenerGrupos);

// Obtener una grupo por id - publico
router.get(
  "/professor/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeGrupoPorId),
  ],
  obtenerGrupo
);

router.get("/period", getGroupsByPeriod);

// Crear grupo - privado - cualquiera con token valido
router.post(
  "/",
  [
    validarJWT,
    validarCampos,
    validateCarrera,
    validateLaboratorio,
    validateMateria,
    check("laboratorio", "El laboratorio es obligatorio").not().isEmpty(),
    check("carrera", "La carrera es obligatoria").not().isEmpty(),
    check("materia", "La materia es obligatoria").not().isEmpty(),
    check(
      "alumnos",
      "El numero de alumnos debe ser mayor que 0 y menor que 100 "
    )
      .notEmpty()
      .isInt({ min: 1, max: 100 }),
    check("equipos", "El numero de equipos debe ser mayor que 0 y menor que 30")
      .notEmpty()
      .isInt({ min: 1, max: 30 }),
    check("dia", "El dia de la semana es obligatorio").not().isEmpty(),
    check("hora", "La hora es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearGrupo
);

// Actualizar una grupo - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeGrupoPorId),
    validarCampos,
  ],
  actualizarGrupo
);

// Eliminar una grupo - privado - cualquiera con token valido
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeGrupoPorId),

    validarCampos,
  ],
  borrarGrupo
);

module.exports = router;
