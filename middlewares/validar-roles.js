const { response } = require("express");

const Usuario = require("../models/usuario");

const esAdminRole = async (req, res = response, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "No se proporcionó el ID del usuario",
    });
  }

  try {
    const dbUser = await Usuario.findById(userId).populate("role");

    if (!dbUser) {
      return res.status(400).json({
        message: "No existe un usuario con ese ID",
      });
    }

    if (dbUser.role.name !== "Administrador") {
      return res.status(401).json({
        message: "No tiene permisos para realizar esta acción",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al validar la eliminación.",
      error,
    });
  }
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
