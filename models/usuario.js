const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    apellidoPaterno: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
    },
    apellidoMaterno: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
    },
    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
      type: String,
      required: true,
      enum: ['ADMIN', 'MAESTRO'],
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
