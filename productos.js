fetch("http://localhost/api/productos")
.ther(response=> response.json())
.then(data=>console.log(data));