const validarCampos = require("../middlewares/validar-campos");
const adminsValidarJWT = require("./admins.validarjwt");
const maestrosValidarJWT = require("./maestros.validarjwt");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
  ...validarCampos,
  ...maestrosValidarJWT,
  ...adminsValidarJWT,
  ...validaRoles,
};
