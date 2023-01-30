const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Maestro = require("../models/models.maestro");

const maestrosGet = async (req, res = response) => {
  const [maestros, total] = await Promise.all([
    Maestro.find({ estado: true }),
    Maestro.count({ estado: true }),
  ]);

  res.json({
    maestros,
    total,
  });
};

const maestroGet = async (req = request, res = response) => {
  const { id } = req.params;
  const maestro = await Maestro.findById({ _id: id, estado: true });

  res.json(maestro);
};

const maestrosPost = async (req, res = response) => {
  const { nombre, correo, apellidoPaterno, apellidoMaterno, password, rol } =
    req.body;
  const maestro = new Maestro({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    password,
    rol,
  });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  maestro.password = bcryptjs.hashSync(password, salt);

  //Guardar registro
  await maestro.save();

  res.json(maestro);
};

const maestrosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const maestro = await Maestro.findByIdAndUpdate(id, resto);

  res.json(maestro);
};

const maestrosDelete = async (req, res = response) => {
  const { id } = req.params;
  const maestro = await maestro.findByIdAndUpdate(id, { estado: false });

  res.json(maestro);
};

module.exports = {
  maestrosGet,
  maestroGet,
  maestrosPost,
  maestrosPut,
  maestrosDelete,
};
