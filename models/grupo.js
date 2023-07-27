const { Schema, model } = require("mongoose");

const GruposSchema = new Schema(
  {
    laboratorio: {
      type: String,
      required: [true, "El laboratorio es obligatorio"],
    },
    carrera: {
      type: String,
      required: [true, "La carrera es obligatorio"],
    },
    materia: {
      type: String,
      required: [true, "La materia es obligatorio"],
    },
    alumnos: {
      type: Number,
      required: [true, "El numero de alumnos es obligatorio"],
    },
    equipos: {
      type: Number,
      required: [true, "El numero de equipos obligatorio"],
    },
    dia: {
      type: Number,
      required: [true, "El dia de la semana es obligatorio"],
    },
    hora: {
      type: Number,
      required: [true, "La hora inicial es obligatoria"],
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    period: {
      type: String,
      required: [true, "El periodo es obligatorio"],
    },
  },
  { timestamps: true }
);

GruposSchema.methods.toJSON = function () {
  const { __v, _id, ...grupos } = this.toObject();
  grupos.uid = _id;
  return grupos;
};

module.exports = model("Grupos", GruposSchema);
