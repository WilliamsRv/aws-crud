const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'base-datos.cx6ywqwc6n1s.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Polula3128',
  database: 'clientes'
});

// Conectar a la base de datos MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un usuario (POST)
app.post('/users', (req, res) => {
  const { nombres, apellidos, fecha, productos, cantidad, informacion } = req.body;
  const query = 'INSERT INTO cliente (nombres, apellidos, fecha, productos, cantidad, informacion) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nombres, apellidos, fecha, productos, cantidad, informacion], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Usuario creado correctamente');
  });
});

// Ruta para obtener todos los usuarios (GET)
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM cliente';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://127.0.0.1:${port}`);
});
