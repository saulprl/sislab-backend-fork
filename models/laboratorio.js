const { Schema, model } = require('mongoose');

const LaboratorioSchema = Schema(
  {
    laboratorio: {
      type: String,
      required: [true, 'El laboratorio es obligatorio'],
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
);

LaboratorioSchema.methods.toJSON = function () {
  const { __v, _id, ...laboratorios } = this.toObject();
  laboratorios.uid = _id;
  return laboratorios;
};

module.exports = model('Laboratorios', LaboratorioSchema);
