const Role = require("../models/models.role");
const Admin = require("../models/models.admin");
const Maestro = require("../models/models.maestro");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Admin.findOne({ correo });
  if (existeEmail)
    throw new Error(`El correo ${correo} ya esta registrado en la BD`);
};

const existeAdminPorId = async (id) => {
  const existeAdmin = await Admin.findById(id);
  if (!existeAdmin) throw new Error(`El id: ${id} no existe en la BD`);
};

const emailMaestroExiste = async (correo = "") => {
  const existeEmail = await Maestro.findOne({ correo });
  if (existeEmail)
    throw new Error(`El correo ${correo} ya esta registrado en la BD`);
};

const existeMaestroPorId = async (id) => {
  const existeAdmin = await Maestro.findById(id);
  if (!existeAdmin) throw new Error(`El id: ${id} no existe en la BD`);
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeAdminPorId,
  emailMaestroExiste,
  existeMaestroPorId,
};
