const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Admin = require("../models/models.admin");

const adminsValidarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const admin = await Admin.findById(uid);

    if (!admin) {
      return res.status(401).json({
        msg: "Token no valido - admin no existe en BD",
      });
    }

    // Verifificar si el uid tiene estado true

    if (!admin.estado) {
      return res.status(401).json({
        msg: "Token no valido - admin con estado: false",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  adminsValidarJWT,
};
