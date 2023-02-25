const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


//Middelware
//esto le dice al servidor que el body que se enviará 
//será en formato JSON
app.use(express.json())

//esto que se pueda ver todo lo de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));


//declarando la carpeta public 


//--------RUTAS----------------------------------

const { routerProductos } = require("./routes/productos.routes")
app.use("/api/productos", routerProductos)



// Ruta para devolver el archivo HTML
app.get('/', (req, res) => {
	
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
	
});

//---------------------------------------------


//Escucha en este puerto
const port = process.env.port || 80;
app.listen(port, () => 
{
	console.log(`Escuchando en puerto http://localhost:${port}`)
});


