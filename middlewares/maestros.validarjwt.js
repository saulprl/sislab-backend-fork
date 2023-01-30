const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Maestro = require("../models/models.maestro");

const maestrosValidarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const maestro = await Maestro.findById(uid);

    if (!maestro) {
      return res.status(401).json({
        msg: "Token no valido - maestro no existe en BD",
      });
    }

    // Verifificar si el uid tiene estado true

    if (!maestro.estado) {
      return res.status(401).json({
        msg: "Token no valido - maestro con estado: false",
      });
    }

    req.maestro = maestro;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  maestrosValidarJWT,
};
