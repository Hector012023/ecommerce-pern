//Importamos express
const express = require("express");

//Creamos la aplicación
const app = express();

//Middleware:
//Función que se ejecuta entes de las rutas.
//En este caso permite que el servidor entienda JSON
app.use(express.json());

// Ruta de prueba
// Get significa que el cliente solicita información

app.get("/", (req, res) => {
  res.send("API funcionando");
});

//Puerto
//Es el canal por deonde el servidor escucha solicitudes
const PORT = 3000;

//Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
