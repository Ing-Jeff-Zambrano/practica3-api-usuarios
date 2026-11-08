const pool = require("../config/db");

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        message: "Los campos nombre y email son obligatorios",
      });
    }

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, telefono)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, email, telefono || null]
    );

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        ok: false,
        message: "El email ya esta registrado",
      });
    }

    console.error("Error al crear usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

const listarUsuarios = async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios ORDER BY id ASC"
    );

    return res.status(200).json({
      ok: true,
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error al listar usuarios:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        ok: false,
        message: "El id debe ser un numero valido",
      });
    }

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        message: `No se encontro un usuario con id ${id}`,
      });
    }

    return res.status(200).json({
      ok: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        ok: false,
        message: "El id debe ser un numero valido",
      });
    }

    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        message: "Los campos nombre y email son obligatorios",
      });
    }

    const result = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, telefono = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, email, telefono || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        message: `No se encontro un usuario con id ${id}`,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Usuario actualizado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        ok: false,
        message: "El email ya esta registrado",
      });
    }

    console.error("Error al actualizar usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        ok: false,
        message: "El id debe ser un numero valido",
      });
    }

    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        message: `No se encontro un usuario con id ${id}`,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Usuario eliminado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
