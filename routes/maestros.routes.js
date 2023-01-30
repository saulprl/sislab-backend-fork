const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  maestrosValidarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailMaestroExiste,
  existeMaestroPorId,
} = require("../helpers/db-validators");

const {
  maestrosGet,
  maestrosPut,
  maestrosPost,
  maestrosDelete,
  maestroGet,
} = require("../controllers/controllers.maestros");

const router = Router();

router.get("/", maestrosGet);

router.get("/:id", maestroGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeMaestroPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  maestrosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellidoPaterno", "El apellido paterno es obligatorio")
      .not()
      .isEmpty(),
    check("apellidoMaterno", "El apellido materno es obligatorio")
      .not()
      .isEmpty(),
    check("password", "El password debe contener mas de 6 caracteres").isLength(
      { min: 6 }
    ),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailMaestroExiste),
    check("rol", "No es un rol valido").isIn("MAESTRO"),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  maestrosPost
);

router.delete(
  "/:id",
  [
    maestrosValidarJWT,
    //esAdminRole,
    tieneRole("ADMIN"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeMaestroPorId),
    validarCampos,
  ],
  maestrosDelete
);

module.exports = router;
