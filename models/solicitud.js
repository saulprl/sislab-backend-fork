const { Schema, model } = require("mongoose");

const SolicitudSchema = new Schema(
  {
    profId: {
      type: Schema.Types.String,
      ref: "User",
      required: [true, "El ID del profesor es obligatorio."],
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "El ID del grupo es obligatorio."],
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Practica",
      required: [true, "El ID de la práctica es obligatorio."],
    },
    requestDate: {
      type: Schema.Types.Number,
      required: [true, "La fecha de la solicitud es obligatoria."],
    },
    customReagents: {
      type: [Map],
      required: [false],
    },
    customEquipment: {
      type: [String],
      required: [false],
    },
    customWaste: {
      type: [Map],
      required: [false],
    },
  },
  { timestamps: true }
);

module.exports = model("Solicitudes", SolicitudSchema);
