const { response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "El correo no es correcto",
      });
    }

    // SI el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario no activo, hable con el administrador",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    // Generar el JWT
    const { token: accessToken, expiresIn } = await generarJWT(usuario.id);

    const refreshToken = jwt.sign(
      { uid: usuario.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      usuario,
      accessToken,
      refreshToken,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const refreshToken = async (req, res) => {
  let { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      msg: "No se encontró un token de revalidación.",
    });
  }

  const { payload } = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    {
      complete: true,
    }
  );

  const { token: accessToken, expiresIn } = await generarJWT(payload.uid);

  refreshToken = jwt.sign(
    { uid: payload.uid },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return res.status(200).json({
    accessToken,
    refreshToken,
    expiresIn,
  });
};

module.exports = {
  login,
  refreshToken,
};
