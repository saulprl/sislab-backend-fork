const { response, request } = require('express');

const Materia = require('../models/carrera');

const materiasGet = async (req = request, res = response) => {
  const [total, materias] = await Promise.all([
    Materia.countDocuments(),
    Materia.find(),
  ]);

  res.json({
    total,
    materias,
  });
};

module.exports = materiasGet;
