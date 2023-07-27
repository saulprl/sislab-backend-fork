const { response, request } = require('express');

const Carrera = require('../models/carrera');

const carrerasGet = async (req = request, res = response) => {
  const [total, carreras] = await Promise.all([
    Carrera.countDocuments(),
    Carrera.find(),
  ]);

  res.json({
    total,
    carreras,
  });
};

module.exports = carrerasGet;
