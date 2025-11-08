// src/cron/statusChecker.js
const cron = require('node-cron');
const db = require('../db');

function start() {
  // Ejecutar todos los días a las 00:05 AM
  cron.schedule('5 0 * * *', async () => {
    console.log("Ejecutando verificación diaria de membresías...");

    try {
      const hoy = new Date().toISOString().slice(0, 10);

      // Usuarios con membresía activa (fecha_vencimiento >= hoy)
      const [vigentes] = await db.query(
        `SELECT DISTINCT usuario_id 
         FROM pagos 
         WHERE fecha_vencimiento >= ?`,
        [hoy]
      );

      const vigentesSet = new Set(vigentes.map(v => v.usuario_id));

      // Traer todos los usuarios
      const [usuarios] = await db.query(`SELECT id FROM usuarios`);

      for (const u of usuarios) {
        const nuevoEstado = vigentesSet.has(u.id) ? "activo" : "inactivo";

        await db.query(
          `UPDATE usuarios SET estado = ? WHERE id = ?`,
          [nuevoEstado, u.id]
        );
      }

      console.log("Actualización de estados completada.");

    } catch (error) {
      console.error("Error en el cron job:", error);
    }
  }, {
    timezone: "America/Bogota"
  });
}

module.exports = { start };
