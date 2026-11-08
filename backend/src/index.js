require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Conexion a PostgreSQL exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a PostgreSQL:", error.message);
    console.error("Revisa el archivo .env y que la base de datos exista.");
    process.exit(1);
  }
}

startServer();
