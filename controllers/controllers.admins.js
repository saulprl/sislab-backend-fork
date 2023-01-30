const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Admin = require("../models/models.admin");

const adminsGet = async (req, res = response) => {
  const [admins, total] = await Promise.all([
    Admin.find({ estado: true }),
    Admin.count({ estado: true }),
  ]);

  res.json({
    admins,
    total,
  });
};

const adminGet = async (req = request, res = response) => {
  const { id } = req.params;
  const admin = await Admin.findById({ _id: id, estado: true });

  res.json(admin);
};

const adminsPost = async (req, res = response) => {
  const { nombre, correo, apellidoPaterno, apellidoMaterno, password, rol } =
    req.body;
  const admin = new Admin({
    nombre,
    correo,
    password,
    apellidoPaterno,
    apellidoMaterno,
    rol,
  });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  admin.password = bcryptjs.hashSync(password, salt);

  //Guardar registro
  await admin.save();

  res.json(admin);
};

const adminsPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const admin = await Admin.findByIdAndUpdate(id, resto);

  res.json(admin);
};

const adminsDelete = async (req, res = response) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndUpdate(id, { estado: false });

  res.json(admin);
};

module.exports = {
  adminsGet,
  adminGet,
  adminsPost,
  adminsPut,
  adminsDelete,
};
