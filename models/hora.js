const { Schema, model } = require('mongoose');

const HoraSchema = new Schema({
  hora: {
    type: String,
    required: [true, 'El horario es obligatorio'],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

HoraSchema.methods.toJSON = function () {
  const { __v, _id, ...horarios } = this.toObject();
  horarios.uid = _id;
  return horarios;
};

module.exports = model('Horarios', HoraSchema);
