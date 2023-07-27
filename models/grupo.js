const { Schema, model } = require("mongoose");

const GruposSchema = new Schema(
  {
    lab: {
      type: String,
      required: [true, "El laboratorio es obligatorio"],
    },
    career: {
      type: String,
      required: [true, "La carrera es obligatoria"],
    },
    signature: {
      type: String,
      required: [true, "La materia es obligatoria"],
    },
    students: {
      type: Number,
      required: [true, "El numero de alumnos es obligatorio"],
    },
    teams: {
      type: Number,
      required: [true, "El numero de equipos obligatorio"],
    },
    day: {
      type: Number,
      required: [true, "El dia de la semana es obligatorio"],
    },
    time: {
      type: Number,
      required: [true, "La hora inicial es obligatoria"],
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    prof: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    period: {
      type: String,
      required: [true, "El periodo es obligatorio"],
    },
  },
  { timestamps: true }
);

module.exports = model("Group", GruposSchema);
