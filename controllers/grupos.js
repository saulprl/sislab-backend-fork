const { response } = require("express");
const { Grupo } = require("../models");

// obtenerGrupos - paginado - total - populate
const obtenerGrupos = async (req = request, res = response) => {
  const query = { status: true };
  try {
    const [total, grupos] = await Promise.all([
      Grupo.countDocuments(query),
      Grupo.find(query).populate("prof"),
    ]);

    res.status(200).json({
      total,
      grupos,
      message: `Total de ${total} grupos obtenidos correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los grupos",
      error: error,
    });
  }
};

const obtenerGrupo = async (req, res = response) => {
  const { id } = req.params;
  const query = { prof: id, estado: true };

  try {
    const [total, grupos] = await Promise.all([
      Grupo.countDocuments(query),
      Grupo.find({ prof: id }).populate("prof").sort({ createdAt: 1 }),
    ]);

    res.status(200).json({
      message: `Total de ${total} grupos obtenidos correctamente`,
      total,
      grupos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los grupos",
      error: error,
    });
  }
};

const getGroupsByPeriod = async (req, res = response) => {
  const { profId, period } = req.query;
  const query = { prof: profId, status: true, period };

  try {
    const [total, grupos] = await Promise.all([
      Grupo.countDocuments(query),
      Grupo.find(query).populate("prof").sort({ createdAt: 1 }),
    ]);

    res.status(200).json({
      message: `Total de ${total} grupos en el periodo ${period} obtenidos correctamente`,
      total,
      grupos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los grupos",
      error: error,
    });
  }
};

const crearGrupo = async (req, res) => {
  const { lab, career, signature, students, teams, day, time, prof, period } =
    req.body;

  try {
    const grupoDB = await Grupo.findOne({
      lab,
      day,
      time,
      period,
    });

    if (grupoDB) {
      return res.status(400).json({
        message: `Ya existe un grupo con los mismos datos.`,
      });
    }

    //Generar data a guardar
    const data = {
      lab,
      career,
      signature,
      students,
      teams,
      day,
      time,
      prof,
      period,
    };

    const grupo = new Grupo(data);

    //Guardar en DB
    await grupo.save();

    res.status(200).json({
      message: `Se ha creado el grupo correctamente.`,
      grupo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el grupo",
      error: error,
    });
  }
};

const actualizarGrupo = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  const grupo = await Grupo.findByIdAndUpdate(id, data, { new: true });

  res.json(grupo);
};

const borrarGrupo = async (req, res = response) => {
  const { id } = req.params;

  const grupoBorrado = await Grupo.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(grupoBorrado);
};

module.exports = {
  obtenerGrupo,
  obtenerGrupos,
  getGroupsByPeriod,
  crearGrupo,
  actualizarGrupo,
  borrarGrupo,
};
