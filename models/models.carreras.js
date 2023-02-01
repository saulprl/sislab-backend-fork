const { Schema, model } = require('mongoose');

const carreras = Schema({
    //TODO: Falta el id no estoy seguro como hacerlo
    carrera1: {
      type: String,
      required: [true, 'El campo carrera es obligatorio'],
    },
    carrera2: {
        type: String,
        required: [true, 'El campo carrera es obligatorio'],
    },
  });
  
module.exports = model('Carrera', carreras);