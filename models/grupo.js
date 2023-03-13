const { Schema, model } = require('mongoose');

const GruposSchema = Schema(
  {
    _id: String,
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    laboratorio: {
      type: String,
      required: [true, 'El laboratorio es obligatorio'],
    },
    carrera: {
      type: String,
      required: [true, 'La carrera es obligatorio'],
    },
    materia: {
      type: String,
      required: [true, 'La materia es obligatorio'],
    },
    alumnos: {
      type: Number,
      required: [true, 'El numero de alumnos es obligatorio'],
    },
    equipos: {
      type: Number,
      required: [true, 'El numero de equipos obligatorio'],
    },
    dia: {
      type: String,
      required: [true, 'El dia de la semana es obligatorio'],
    },
    hora: {
      type: String,
      required: [true, 'La hora inicial es obligatoria'],
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  { timestamps: true }
);

GruposSchema.methods.toJSON = function () {
  const { __v, _id, ...grupos } = this.toObject();
  grupos.uid = _id;
  return grupos;
};

module.exports = model('Grupos', GruposSchema);
