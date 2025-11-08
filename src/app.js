const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(cors());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const pagosRoutes = require('./routes/pagos');
const lecturasRoutes = require('./routes/lecturas');

// Usar rutas
app.use('/usuarios', usuariosRoutes);
app.use('/pagos', pagosRoutes);
app.use('/lecturas', lecturasRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor de Numerología funcionando correctamente');
});

module.exports = app;
