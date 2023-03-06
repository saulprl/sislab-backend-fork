const { response, request } = require('express');

const Carrera = require('../models/carrera');

const carrerasGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
  
    const [total, carreras] = await Promise.all([
      Carrera.countDocuments(query),
      Carrera.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
  
    res.json({
      total,
      carreras,
    });
  };

  module.exports = carrerasGet;