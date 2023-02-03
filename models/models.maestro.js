const { Schema, model } = require("mongoose");

const MaestroSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  apellidoPaterno: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  apellidoMaterno: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña  es obligatoria"],
  },
  rol: {
    type: String,
    required: true,
    enum: ["MAESTRO"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fechaDeRegistro: {
    type: Date,
    required: true,
  },
});

MaestroSchema.methods.toJSON = function () {
  const { __v, _id, password, ...maestro } = this.toObject();
  maestro.uid = _id;
  return maestro;
};

module.exports = model("Maestro", MaestroSchema);
