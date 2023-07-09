const { Schema, model } = require('mongoose');

const MateriaSchema = new Schema({
  materia: {
    type: String,
    required: [true, 'La materia es obligatoria'],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

MateriaSchema.methods.toJSON = function () {
  const { __v, _id, ...materias } = this.toObject();
  materias.uid = _id;
  return materias;
};

module.exports = model('Materias', MateriaSchema);
