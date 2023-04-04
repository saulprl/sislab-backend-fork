const { response, request } = require('express');

const Hora = require('../models/hora');

const horasGet = async (req = request, res = response) => {
  const [total, horas] = await Promise.all([
    Hora.countDocuments(),
    Hora.find(),
  ]);

  res.json({
    total,
    horas,
  });
};

module.exports = horasGet;
