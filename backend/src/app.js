const express = require("express");
const cors = require("cors");
const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API REST Usuarios - Practica 3 UNEMI",
    endpoints: {
      "POST /usuarios": "Registrar usuario",
      "GET /usuarios": "Listar usuarios",
      "GET /usuarios/:id": "Consultar usuario por id",
      "PUT /usuarios/:id": "Actualizar usuario",
      "DELETE /usuarios/:id": "Eliminar usuario",
    },
  });
});

app.use("/usuarios", usuariosRoutes);

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
  });
});

module.exports = app;
