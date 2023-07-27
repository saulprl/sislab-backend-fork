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

const {
  existeGrupoPorId,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  validateAuth,
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
  [check("id").custom(existeUsuarioPorId)],
  obtenerGrupo
);

router.get("/period", getGroupsByPeriod);

// Crear grupo - privado - cualquiera con token valido
router.post(
  "/",
  [
    validateAuth,
    validateCarrera,
    validateLaboratorio,
    validateMateria,
    check("lab", "El laboratorio es obligatorio").not().isEmpty(),
    check("career", "La carrera es obligatoria").not().isEmpty(),
    check("signature", "La materia es obligatoria").not().isEmpty(),
    check(
      "students",
      "El numero de alumnos debe ser mayor que 0 y menor que 100 "
    )
      .notEmpty()
      .isInt({ min: 1, max: 100 }),
    check("teams", "El numero de equipos debe ser mayor que 0 y menor que 30")
      .notEmpty()
      .isInt({ min: 1, max: 30 }),
    check("day", "El dia de la semana es obligatorio").not().isEmpty(),
    check("time", "La hora es obligatoria").not().isEmpty(),
  ],
  crearGrupo
);

// Actualizar una grupo - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validateAuth,
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
    validateAuth,
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeGrupoPorId),

    validarCampos,
  ],
  borrarGrupo
);

module.exports = router;
