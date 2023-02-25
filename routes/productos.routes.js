const express = require('express')
const FILE_PATH = './entidades/productos.json';
const fs = require('fs');


const routerProductos = express.Router();

//al usar:
//app.use("/api/productos", routerProductos)
//puedo omitir la parte de /api/productos 
//en los routerProductos

//DEVOLVER TODOS LOS PRODUCTOS
routerProductos.get('/', (req, res) => {
	console.log('metodo get');
	fs.readFile(FILE_PATH, (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error al obtener los productos');
		}

		const productos = JSON.parse(data);
		res.send(productos);
	});
});

//DEVUELVE UN PRODUCTO ESPECIFICO
routerProductos.get('/:id', (req, res) => {
	const productos = productos.find(c => c.id == parseInt(req.params.id));
	if (!productos) return res.status(404).send('producto no encontrado');
	else res.send(productos);
})

//REGISTRA UN NUEVO PRODUCTO
routerProductos.post('/', (req, res) => {
	console.log('metodo post');
	if (!req.body || !req.body.title || !req.body.description || !req.body.price){
		return res.status(411).send({message:'Cuerpo no enviado correctamente'})
	}
	
	fs.readFile(FILE_PATH, (err, data) => {
		const messageError = {message: 'Error al agregar el producto' }

		if (err) {
			console.error(err);
			return res.status(500).send(messageError);
		}
		

		const productos = JSON.parse(data);

		const nuevoProducto = {
			id:productos.length+1,
			title: req.body.title,
			price: req.body.price,
			description: req.body.description
		}

		productos.push(nuevoProducto);

		//Reescribiendo archivo json
		fs.writeFile(FILE_PATH, JSON.stringify(productos), (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(messageError);
			}

			res.send(productos);
		});
	});
})

//ELIMINAR UN PRODUCTO ESPECIFICO
routerProductos.delete('/:id', (req, res) => {
	//id a eliminar

	//validando cuerpo
	if (!req.params.id){
		res.status(404).send({ message: 'Id no especificado en la ruta' })
	}
	
	const id = req.params.id;

	fs.readFile(FILE_PATH, (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send({ message: 'Error al eliminar el producto' });
		}
		console.log('campturé los datos');

		let productos = JSON.parse(data);
		console.log(productos);
		//no uso igualdad NO estricta (==) para no parsear el id a entero
		const indice=productos.findIndex(p=>p.id==id)

		if (indice === -1) {
			return res.status(404).send({ message: 'Producto no encontrado' });
		}

		//eliminando producto del array
		productos.splice(indice, 1);


		//Reescribiendo archivo json
		console.log('apunto de reeescribir json');
		fs.writeFile(FILE_PATH, JSON.stringify(productos), (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send({ message: 'Error al eliminar el producto' });
			}

			res.send(productos);
		});
	});

});


// Método PUT para actualizar un producto existente
routerProductos.put('/:id', (req, res) => {
	if (!req.params.id) {
		res.status(404).send({ message: 'Id no especificado en la ruta' })
	}
	if (!req.body || !req.body.title || !req.body.description || !req.body.price) {
		return res.status(411).send({ message: 'Cuerpo no enviado correctamente' })
	}

	const id = req.params.id;

	

	fs.readFile(FILE_PATH, (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send({ message: 'Error al actualizar el producto' });
		}

		let productos = JSON.parse(data);
		const indice = productos.findIndex((producto) => producto.id == id);
		
		if (indice === -1) {
			return res.status(404).send({ message: 'Producto no encontrado' });
		}

		const productoActualizado = {
			id:id,
			title: req.body.title,
			price: req.body.price,
			description: req.body.description
		}
		//remplazando en array
		productos.splice(indice, 1, { ...productoActualizado })

		//Reescribiendo archivo JSON
		fs.writeFile(FILE_PATH, JSON.stringify(productos), (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send({message: 'Error al actualizar el producto'});
			}

			res.send(productos[indice]);
		});
	});
});

module.exports.routerProductos=routerProductos