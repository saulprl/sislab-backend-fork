const { response } = require("express");

const esMaestroRole = (req, res = response, next) => {
  if (!req.admin) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol, nombre } = req.admin;

  if (rol !== "ADMIN") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede realizar esta accion`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.admin) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.admin.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esMaestroRole,
  tieneRole,
};
