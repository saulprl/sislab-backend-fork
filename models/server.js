const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Rutas
    this.adminsPath = "/api/admins";
    this.maestrosPath = "/api/maestros";
    this.adminsAuthPath = "/api/admins/auth";
    this.maestrosAuthPath = "/api/maestros/auth";

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.adminsAuthPath, require("../routes/admins.auth.routes"));
    this.app.use(
      this.maestrosAuthPath,
      require("../routes/maestros.auth.routes")
    );
    this.app.use(this.adminsPath, require("../routes/admins.routes"));
    this.app.use(this.maestrosPath, require("../routes/maestros.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
