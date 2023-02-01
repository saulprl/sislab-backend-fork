const { Schema, model } = require('mongoose');

const salones = Schema({
    //TODO: Falta el id no estoy seguro como hacerlo
    salon1: {
      type: String,
      required: [true, 'El salon es obligatorio'],
    },
    salon2: {
        type: String,
        required: [true, 'El salon es obligatorio'],
    },
    salon3: {
        type: String,
        required: [true, 'El salon es obligatorio'],
    },
    salon4: {
        type: String,
        required: [true, 'El salon es obligatorio'],
    },
  });
  
module.exports = model('Salon', salones);