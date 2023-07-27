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

CarreraSchema.methods.toJSON = function () {
  const { __v, _id, ...carreras } = this.toObject();
  carreras.uid = _id;
  return carreras;
};

module.exports = model("Carreras", CarreraSchema);
