const { Schema, model } = require('mongoose');

const HoraSchema = Schema(
  {
    hora: {
      type: String,
      required: [true, 'El hora es obligatorio'],
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
);

HoraSchema.methods.toJSON = function () {
  const { __v, _id, ...horas } = this.toObject();
  horas.uid = _id;
  return horas;
};

module.exports = model('Horas', HoraSchema);