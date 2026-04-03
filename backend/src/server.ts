//Importamos express
import app from './app';


//Puerto
//Es el canal por deonde el servidor escucha solicitudes
const PORT: number = 3000;

//Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
