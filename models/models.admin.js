const { Schema, model } = require("mongoose");

const AdminSchema = Schema({
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
    enum: ["ADMIN"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fechaDeRegistro: {
    type: String,
    required: true
  },
});

AdminSchema.methods.toJSON = function () {
  const { __v, password, _id, ...admin } = this.toObject();
  admin.uid = _id;
  return admin;
};

module.exports = model("Admin", AdminSchema);
