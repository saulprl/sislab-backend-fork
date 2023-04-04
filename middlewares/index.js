const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarDatos = require('../middlewares/validar-datos');

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ...validarDatos,
};
