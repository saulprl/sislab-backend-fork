const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Grupo, Producto } = require('../models');

const coleccionesPermitidas = ['usuarios', 'grupos', 'productos', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino); // True

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarGrupos = async (termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino); // True

  if (esMongoID) {
    const grupo = await Grupo.findById(termino).populate('usuario', 'nombre');
    return res.json({
      results: grupo ? [grupo] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const grupos = await Grupo.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  }).populate('usuario', 'nombre');

  res.json({
    results: grupos,
  });
};

const buscarProductos = async (termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino); // True

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      'grupo',
      'nombre'
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const productos = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  }).populate('grupo', 'nombre');

  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;

    case 'grupos':
      buscarGrupos(termino, res);
      break;

    case 'productos':
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: 'Se le olvido hacer esta busqueda',
      });
  }
};

module.exports = {
  buscar,
};
