const { response, request } = require("express");
const Grupos = require("../models/models.grupos");

const getGrupos = async (req, res = response) => {
  const [total, grupos] = await Promise.all([
    Grupos.countDocuments(),
    Grupos.find(),
  ]);

  res.json({
    total,
    grupos,
  });
};

const getGruposById = async (req, res = response) => {
  const { id } = req.params;
  const grupos = await Grupos.findById(id);

  res.json({ grupos });
};

export { getGrupos, getGruposById };
