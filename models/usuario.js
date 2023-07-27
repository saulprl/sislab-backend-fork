const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    _id: {
      type: Schema.Types.String,
      required: [true, "El ID de usuario es obligatorio"],
    },
    name: {
      type: Schema.Types.String,
      required: [true, "El nombre es obligatorio"],
    },
    surname: {
      type: Schema.Types.String,
      required: [true, "El apellido es obligatorio"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      default: new Types.ObjectId("64c15f30bbe0a4d83069591c"),
    },
    status: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
