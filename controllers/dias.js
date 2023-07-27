const { response, request } = require('express');

const Dia = require('../models/dia');

const diasGet = async (req = request, res = response) => {
  const [total, dias] = await Promise.all([Dia.countDocuments(), Dia.find()]);

  res.json({
    total,
    dias,
  });
};

module.exports = diasGet;
