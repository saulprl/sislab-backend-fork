const practica = require("../models/practica");

const getAssignments = async (req, res) => {
  try {
    const assignments = await practica.find().sort({ number: 1 }).exec();

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las prácticas.",
    });
  }
};

module.exports = getAssignments;
