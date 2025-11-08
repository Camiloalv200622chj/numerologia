const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('📖 Ruta de lecturas funcionando');
});

module.exports = router;
