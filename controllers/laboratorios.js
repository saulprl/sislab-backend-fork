const { response, request } = require('express');

const Laboratorio = require('../models/laboratorio');

const laboratoriosGet = async (req = request, res = response) => {
  const [total, laboratorios] = await Promise.all([
    Laboratorio.countDocuments(),
    Laboratorio.find(),
  ]);

  res.json({
    total,
    laboratorios,
  });
};

module.exports = laboratoriosGet;
