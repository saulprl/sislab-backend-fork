const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const Role = require("../models/role");
const { default: mongoose } = require("mongoose");

const usuarioGet = async (req, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No se proporcionó el ID del usuario",
    });
  }

  try {
    const dbUser = await Usuario.findById(id).populate("role");

    res.status(200).json({
      message: "Usuario obtenido correctamente",
      user: dbUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener el usuario",
      error,
    });
  }
};

const usuariosGet = async (req = request, res = response) => {
  // const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).populate("role"),
    ]);

    usuarios.sort((a, b) => {
      if (a.role.name === "Sin asignar") return -1;

      return 1;
    });

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
  const { userId, name, surname } = req.body;

  try {
    // Verificar si el usuario existe
    const existing = await Usuario.findOne({ _id: userId });
    if (existing) {
      return res.status(202).json({
        message: "El usuario ya existe",
      });
    }

    const usuario = new Usuario({
      _id: userId,
      name,
      surname,
    });

    // Encriptar la contraseña
    // const salt = bcryptjs.genSaltSync();
    // usuario.password = bcryptjs.hashSync(password, salt);

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

const updateRole = async (req, res = response) => {
  const { userId, role, status } = req.body;

  if (!userId || !role) {
    return res.status(400).json({
      message: "No se proporcionaron los datos necesarios.",
    });
  }

  try {
    const roleId = mongoose.Types.ObjectId(role);

    if (!roleId) {
      return res.status(400).json({
        message: "El rol proporcionado no existe.",
      });
    }

    const dbUser = await Usuario.findById(userId);
    const updatedUser = await Usuario.findByIdAndUpdate(
      userId,
      {
        role: roleId,
        status: status !== undefined ? status : dbUser.status,
      },
      { runValidators: true }
    );

    res.status(200).json({
      message: "Rol actualizado correctamente.",
      userName: `${updatedUser.name} ${updatedUser.surname}`,
      role: await Role.findById(role),
      status: status !== undefined ? status : dbUser.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al actualizar el rol.",
      error,
    });
  }
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No se proporcionó el ID del usuario",
    });
  }

  try {
    await Usuario.deleteOne({ _id: id });

    res.status(200).json({
      message: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al eliminar el usuario.",
      error,
    });
  }
};

module.exports = {
  usuarioGet,
  usuariosGet,
  usuariosPost,
  usuariosPut: updateRole,
  usuariosPatch,
  usuariosDelete,
};
