const validarCampos = require('../middlewares/validar-campos');
const validateAuth = require('./validate-auth');
const validaRoles = require('../middlewares/validar-roles');
const validarDatos = require('../middlewares/validar-datos');

module.exports = {
  ...validarCampos,
  ...validateAuth,
  ...validaRoles,
  ...validarDatos,
};
