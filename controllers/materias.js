const { response, request } = require('express');

const Materia = require('../models/carrera');

const materiasGet = async (req = request, res = response) => {
  const query = { estado: true };

  const [total, materias] = await Promise.all([
    Materia.countDocuments(query),
    Materia.find(query),
  ]);

  res.json({
    total,
    materias,
  });
};

module.exports = materiasGet;
