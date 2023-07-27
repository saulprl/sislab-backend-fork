const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Grupo = require("../models/grupo");
const { default: mongoose } = require("mongoose");

/**
 * Verificar si el rol existe en la base de datos
 * @param {string | undefined} roleId
 */
const esRoleValido = async (roleId) => {
  if (!roleId) {
    throw new Error("El rol es obligatorio");
  }

  const existeRol = await Role.findOne({
    _id: new mongoose.Types.ObjectId(roleId),
  });
  if (!existeRol) {
    throw new Error(
      `El rol "${roleId}" no está registrado en la base de datos`
    );
  }
};

const emailExiste = async (correo) => {
  if (!correo) {
    throw new Error("El correo es obligatorio");
  }

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo "${correo}" ya está registrado`);
  }
};

/**
 * Verificar si el usuario está registrado en la base de datos
 * @param {string | undefined} id
 */
const existeUsuarioPorId = async (id) => {
  if (!id) {
    throw new Error("El ID es obligatorio");
  }

  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID proporcionado no existe`);
  }
};

const existeGrupoPorId = async (id) => {
  const existeGrupo = await Grupo.findById(id);
  if (!existeGrupo) {
    throw new Error(`El ID del grupo no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeGrupoPorId,
};
