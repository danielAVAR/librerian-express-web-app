require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
