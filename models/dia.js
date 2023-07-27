const { Schema, model } = require('mongoose');

const DiaSchema = new Schema(
  {
    dia: {
      type: String,
      required: [true, 'El dia es obligatorio'],
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
);

DiaSchema.methods.toJSON = function () {
  const { __v, _id, ...dias } = this.toObject();
  dias.uid = _id;
  return dias;
};

module.exports = model('Dias', DiaSchema);
