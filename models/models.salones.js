const { Schema, model } = require("mongoose");

const SalonSchema = Schema({
  salon1: {
    type: String,
    required: [true, "El salon es obligatorio"],
  },
  salon2: {
    type: String,
    required: [true, "El salon es obligatorio"],
  },
  salon3: {
    type: String,
    required: [true, "El salon es obligatorio"],
  },
  salon4: {
    type: String,
    required: [true, "El salon es obligatorio"],
  },
});

SalonSchema.methods.toJSON = function () {
  const { __v, _id, ...salon } = this.toObject();
  salon.uid = _id;
  return salon;
};

module.exports = model("Salon", salones);
