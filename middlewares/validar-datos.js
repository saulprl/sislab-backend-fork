const Laboratorio = require("../models/laboratorio");
const Carrera = require("../models/carrera");
const Materia = require("../models/materia");
const Dia = require("../models/dia");
const Hora = require("../models/hora");

const validateLaboratorio = (req, res, next) => {
  const { lab } = req.body;

  Laboratorio.findOne({ laboratorio: lab }, (err, laboratorio) => {
    if (err) {
      return res.status(500).json({ msg: "Error de servidor" });
    }

    if (!laboratorio) {
      return res.status(400).json({ msg: "El laboratorio no existe" });
    }

    next();
  });
};

const validateCarrera = (req, res, next) => {
  const { career } = req.body;

  Carrera.findOne({ carrera: career }, (err, carrera) => {
    if (err) {
      return res.status(500).json({ msg: "Error de servidor" });
    }

    if (!carrera) {
      return res.status(400).json({ msg: "La carrera no existe" });
    }

    next();
  });
};

const validateMateria = (req, res, next) => {
  const { signature } = req.body;

  Materia.findOne({ materia: signature }, (err, materia) => {
    if (err) {
      return res.status(500).json({ msg: "Error de servidor" });
    }

    if (!materia) {
      return res.status(400).json({ msg: "La materia no existe" });
    }

    next();
  });
};

const validateDia = (req, res, next) => {
  const dia = req.body.dia;

  Dia.findOne({ dia: dia }, (err, dia) => {
    if (err) {
      return res.status(500).json({ msg: "Error de servidor" });
    }

    if (!dia) {
      return res.status(400).json({ msg: "El día no existe" });
    }

    next();
  });
};

const validateHora = (req, res, next) => {
  const hora = req.body.hora;

  Hora.findOne({ hora: hora }, (err, hora) => {
    if (err) {
      return res.status(500).json({ msg: "Error de servidor" });
    }

    if (!hora) {
      return res.status(400).json({ msg: "La hora no existe" });
    }

    next();
  });
};

module.exports = {
  validateCarrera,
  validateDia,
  validateHora,
  validateLaboratorio,
  validateMateria,
};
