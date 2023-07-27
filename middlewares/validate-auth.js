const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const { response } = require("express");

const validateAuth = ClerkExpressRequireAuth({
  onError: (error) =>
    response.status(401).json({ message: "Acceso no autorizado", error }),
});

module.exports = { validateAuth };
