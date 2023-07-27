const { Schema, model } = require("mongoose");

const CarreraSchema = new Schema({
  carrera: {
    type: String,
    required: [true, "La carrera es obligatoria"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("Carrera", CarreraSchema);
