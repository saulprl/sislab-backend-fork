const { response, request } = require('express');

const Laboratorio = require('../models/carrera');

const laboratoriosGet = async (req = request, res = response) => {
  const query = { estado: true };

  const [total, laboratorios] = await Promise.all([
    Laboratorio.countDocuments(query),
    Laboratorio.find(query),
  ]);

  res.json({
    total,
    laboratorios,
  });
};

module.exports = laboratoriosGet;
