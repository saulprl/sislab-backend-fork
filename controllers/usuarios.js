const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuarioGet = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json(usuario);
};

const usuariosGet = async (req = request, res = response) => {
  // const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query),
      // .skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      usuarios,
      message: "Usuarios obtenidos correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al obtener los usuarios.",
      error,
    });
  }
};

const usuariosPost = async (req, res = response) => {
  const { nombre, apellidoMaterno, apellidoPaterno, correo, rol } = req.body;
  const password = uuidv4().substring(7, 16);

  try {
    const usuario = new Usuario({
      nombre,
      apellidoMaterno,
      apellidoPaterno,
      correo,
      password,
      rol,
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Send email with password

    res.status(201).json({
      usuario,
      message: "Usuario creado correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al crear el usuario.",
      error,
    });
  }
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuarioGet,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
