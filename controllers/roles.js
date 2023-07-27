const Role = require("../models/role");

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().exec();

    res.status(200).json({
      roles,
      message: "Roles obtenidos correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al obtener los roles.",
      error,
    });
  }
};

module.exports = getRoles;
