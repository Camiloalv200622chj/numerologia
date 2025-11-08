// src/utils/aiSimulator.js

function generarLecturaPrincipal(fechaNacimiento, nombre) {
  const d = new Date(fechaNacimiento);
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();

  // número de numerología básico
  const numero = ((day + month + year) % 9) || 9;

  return `
Lectura principal para ${nombre}:

Tu número de vida es ${numero}.
Este número indica una etapa de transformación, crecimiento personal
y claridad para los próximos meses.

Aprovecha tu energía interna para tomar mejores decisiones y conectar 
con personas que apoyen tu proceso.
  `;
}

function generarLecturaDiaria(usuario, fecha = new Date()) {
  const mensajes = [
    "Hoy es un día ideal para reflexionar.",
    "Una oportunidad inesperada puede aparecer.",
    "Tu intuición estará fuerte hoy.",
    "Evita discusiones y mantén la calma.",
    "Día perfecto para organizar tus metas."
  ];

  const index = (fecha.getDate() + usuario.id) % mensajes.length;

  return `
Lectura diaria para ${usuario.nombre}:

${mensajes[index]}
  `;
}

module.exports = {
  generarLecturaPrincipal,
  generarLecturaDiaria
};
