const { response, request } = require('express');

const Dia = require('../models/dia');

const diasGet = async (req = request, res = response) => {
  const query = { estado: true };

  const [total, dias] = await Promise.all([
    Dia.countDocuments(query),
    Dia.find(query),
  ]);

  res.json({
    total,
    dias,
  });
};

module.exports = diasGet;
