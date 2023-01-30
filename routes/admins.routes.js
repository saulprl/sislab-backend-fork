const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  adminsValidarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeAdminPorId,
} = require("../helpers/db-validators");

const {
  adminsGet,
  adminsPut,
  adminsPost,
  adminsDelete,
  adminGet,
} = require("../controllers/controllers.admins");

const router = Router();

router.get("/", adminsGet);

router.get("/:id", adminGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeAdminPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  adminsPut
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
    check("correo").custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  adminsPost
);

router.delete(
  "/:id",
  [
    adminsValidarJWT,
    //esAdminRole,
    tieneRole("ADMIN"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeAdminPorId),
    validarCampos,
  ],
  adminsDelete
);

module.exports = router;
