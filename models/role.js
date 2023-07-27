const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "El rol es obligatorio"],
    },
  },
  { timestamps: true }
);

module.exports = model("Role", RoleSchema);
