const { response } = require("express");
const Admin = require("../models/models.admin");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const admin = await Admin.findOne({ correo });

    if (!admin) {
      return res.status(400).json({
        msg: "El correo no existe, verifique sus datos",
      });
    }

    //Si el admin está activo
    if (!admin.estado) {
      return res.status(400).json({
        msg: "Administrador dado de baja, comuniquese con el encargado del sistema",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña no es correcta, verifique sus datos",
      });
    }

    //Generar el JWT
    const token = await generarJWT(admin.id);

    res.json({
      admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
