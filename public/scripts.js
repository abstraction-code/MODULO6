const tbody = document.querySelector('tbody')
let carrito = []
const URL_BASE="localhost:80"

//llamando productos


//LLAMADA A LOS PRODUCTOS
fetch('/api/productos').then(res=>res.json())
.then(data=>renderProducts(data))

function renderProducts(products) {
	const productContainer = document.querySelector('#contenedor-productos');
	if (products.length === 0) {
		productItem.innerHTML = 'Productos no encontrados'
		return
	}
	products.forEach(product => {
		const productItem = document.createElement('div');
		productItem.classList.add('product-item');
		productItem.innerHTML =
			`
			<div class="cold f-flex justify-content-center mb-4">
					<div class="card shadow mb-1 bg-danger rounden" style="width: 20rem;">
						<h5 class="card-title pt-2 txt-center text-white">${product.title}</h5>
						<img src="./imagen/x.jpg" class="card-img-top" alt="...">
						<div class="card-body  ">
							<p class="card-text text-white-50  description">
								${product.description}
							</p>
							<p class="card-text text-white-50  description">
								Cantidad: ${product.quantity}
							</p>
							<h5  class="text-white precio">Precio: S/<span class="Precio">${product.price}</span></h5>
							<div class="d-grid gap-2">
								<button data-title="${product.title}" data-precio="${product.price}" data-"${product.quantity}"  class="btn btn-primary btn-danger active button">Añadir a Carrito </button>
							</div>
						</div>
					</div>
				</div>
    `;
		productContainer.appendChild(productItem);
		const Clickbutton = document.querySelectorAll('.button')
		Clickbutton.forEach(btn => {
			btn.addEventListener('click', addToCarritoItem)
		})
	});
}


////añadiendo listener a los botones
//const Clickbutton = document.querySelectorAll('.button')
//Clickbutton.forEach(btn => {
//	btn.addEventListener('click', addToCarritoItem)
//})



function addToCarritoItem(e) {
	console.log(e);
	const button = e.target
	const item = button.closest('.card')
	const itemTitle = item.querySelector('.card-title').textContent;
	const itemPrice = item.querySelector('.Precio').textContent;
	const itemImg = item.querySelector('.card-img-top').src;

	const newItem = {
		title: itemTitle,
		precio: itemPrice,
		img: itemImg,
		cantidad: 1
	}

	//
	console.log('PROBANDO',newItem);

	addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

	const alert = document.querySelector('.alert')
	setTimeout(function () {
		alert.classList.add('hide')
	}, 2000)
	alert.classList.remove('hide')

	const InputElemento = tbody.getElementsByClassName('input__elemento')
	
	
	for (let i = 0; i < carrito.length; i++) {
		if (carrito[i].title.trim() === newItem.title.trim()) {
			carrito[i].cantidad++;
			const inputValue = InputElemento[i]
			inputValue.value++;
			CarritoTotal()
			return null;
		}
	}


	carrito.push(newItem)

	renderCarrito()
}

function renderCarrito() {
	tbody.innerHTML = ''
	carrito.map(item => {
		const tr = document.createElement('tr')
		tr.classList.add('ItemCarrito')
		const Content = `

        <th scope="row">1</th>
        <td class="table__productos">
          <img src=${item.img} alt="">
          <h6 class="title"> ${item.title} </h6>
        </td>
        <td class="table__price"> <p> ${item.precio} </p></td>
        <td class="table__cantidad">
        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
        <button class="delete btn btn-danger">x</button>
        </td>
        `
		tr.innerHTML = Content
		tbody.append(tr)

		tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
		tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
	})
	CarritoTotal()
}

function CarritoTotal() {
	let Total = 0;
	const itemCartTotal = document.querySelector('.itemCartTotal')
	carrito.forEach((item) => {
		const Precio = Number(item.precio.replace("$", ''))
		Total = Total + Precio * item.cantidad
	})

	itemCartTotal.innerHTML = `Total $${Total}`
}
function removeItemCarrito(e) {
	const buttonDelete = e.target
	const tr = buttonDelete.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	for (let i = 0; i < carrito.length; i++) {
		if (carrito[i].title.trim() == title.trim()) {
			carrito.splice(i, 1)
		}
	}
	tr.remove()
	CarritoTotal()
}
function sumaCantidad(e) {
	const sumaInput = e.target
	const tr = sumaInput.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	carrito.forEach(item => {
		if (item.title.trim() === item.title.trim()) {
			sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
			item.cantidad = sumaInput.value;
			CarritoTotal()
		}
	})

}




