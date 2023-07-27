const { Router } = require("express");
const { check, body } = require("express-validator");

const {
  validarCampos,
  validateAuth,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuarioGet,
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get(
  "/:id",
  [check("id").custom(existeUsuarioPorId), validarCampos],
  usuarioGet
);

router.get("/", usuariosGet);

router.put(
  "/update-role",
  [
    // validateAuth,
    body("userId").custom(existeUsuarioPorId),
    body("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    body("userId", "El ID de usuario es obligatorio").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "Los apellidos son obligatorios").not().isEmpty(),
    // validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateAuth,
    esAdminRole,
    // tieneRole("ADMIN", "MAESTRO"),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
