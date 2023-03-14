const { response, request } = require('express');

const Hora = require('../models/carrera');

const horasGet = async (req = request, res = response) => {
  const query = { estado: true };

  const [total, horas] = await Promise.all([
    Hora.countDocuments(query),
    Hora.find(query),
  ]);

  res.json({
    total,
    horas,
  });
};

module.exports = horasGet;
