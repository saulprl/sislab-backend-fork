const Laboratorio = require('../models/laboratorio');
const Carrera = require('../models/carrera');
const Materia = require('../models/materia');
const Dia = require('../models/dia');
const Hora = require('../models/hora');

const validateLaboratorio = (req, res, next) => {
  const laboratorio = req.body.laboratorio;

  Laboratorio.findOne({ laboratorio: laboratorio }, (err, laboratorio) => {
    if (err) {
      return res.status(500).send('Error de servidor');
    }

    if (!laboratorio) {
      return res.status(400).send('El laboratorio no existe');
    }

    req.laboratorio = laboratorio;
    next();
  });
};

const validateCarrera = (req, res, next) => {
  const carrera = req.body.carrera;

  Carrera.findOne({ carrera: carrera }, (err, carrera) => {
    if (err) {
      return res.status(500).send('Error de servidor');
    }

    if (!carrera) {
      return res.status(400).send('La carrera no existe');
    }

    req.carrera = carrera;
    next();
  });
};

const validateMateria = (req, res, next) => {
  const materia = req.body.materia;

  Materia.findOne({ materia: materia }, (err, materia) => {
    if (err) {
      return res.status(500).send('Error de servidor');
    }

    if (!materia) {
      return res.status(400).send('La materia no existe');
    }

    req.materia = materia;
    next();
  });
};

const validateDia = (req, res, next) => {
  const dia = req.body.dia;

  Dia.findOne({ dia: dia }, (err, dia) => {
    if (err) {
      return res.status(500).send('Error de servidor');
    }

    if (!dia) {
      return res.status(400).send('El día no existe');
    }

    req.dia = dia;
    next();
  });
};

const validateHora = (req, res, next) => {
  const hora = req.body.hora;

  Hora.findOne({ hora: hora }, (err, hora) => {
    if (err) {
      return res.status(500).send('Error de servidor');
    }

    if (!hora) {
      return res.status(400).send('La hora no existe');
    }

    req.hora = hora;
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
