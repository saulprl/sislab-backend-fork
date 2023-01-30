const { response } = require("express");
const Maestro = require("../models/models.maestro");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const maestro = await Maestro.findOne({ correo });

    if (!maestro) {
      return res.status(400).json({
        msg: "El correo no existe, verifique sus datos",
      });
    }

    //Si el maestro está activo
    if (!maestro.estado) {
      return res.status(400).json({
        msg: "Maestro dado de baja, comuniquese con el encargado del sistema",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, maestro.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña no es correcta, verifique sus datos",
      });
    }

    //Generar el JWT
    const token = await generarJWT(maestro.id);

    res.json({
      maestro,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el maestroistrador",
    });
  }
};

module.exports = {
  login,
};
