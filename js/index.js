//importamos la clase que creamos
import { Producto } from '/classes/Producto.js';

//cargamos lo que tengamos en el local storage.
Producto.cargarDelLocalStorage();

//creamos una constante con la que accedemos al formulario
const formulario = document.getElementById('productoForm');
const productoFila = document.getElementById('productoFila'); // accedemos al tbody 

let Edicion = false;
let cogidoAEditar = null;

console.log(Producto.items);

// creamos una funcion que se encargara de actualizar la tabla cuando se agrega un nuevo producto
function updateTablaProductos() {

    //iniciamos limpiando la fila
    productoFila.innerHTML = " ";

    //recorremos el array que definimos en Producto.js (producto.items) 
    Producto.items.forEach((producto) => {
        //creamos a la vez una nueva fila tr para cada producto
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td><img src="${producto.imagen}" alt="Imagen del producto" width="50"></td>
            <td>${producto.precio}</td>
            <td>$<button data-codigo ='${producto.codigo}' class= "eliminar">Eliminar</button></td>
            <td>$<button data-codigo ='${producto.codigo}'class= "editar">Editar</button></td>
        `;
        productoFila.appendChild(fila);
    });

}


//Eliminar Producto
document.getElementById("tablaProductos").addEventListener("click", (event) => {
    if (event.target.className === "eliminar"){
        let button = event.target;
console.dir(button);

        let productoCodigo = button.dataset.codigo;
        console.log("Producto elegido: ", productoCodigo)
        Producto.eliminarProducto(productoCodigo);
        updateTablaProductos();
        
    }
})
//Editar Producto
document.getElementById("tablaProductos").addEventListener("click", (event) => {
    if (event.target.className === "editar"){
        let button = event.target;
console.dir(button);

        let productoCodigo = button.dataset.codigo;
        console.log("Producto a editar: ", productoCodigo)
       let producto = Producto.items.find((item) => item.codigo === productoCodigo);

       if (producto){
        document.getElementById('codigo').value = producto.codigo;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('imagen').value = producto.imagen;

document.getElementById('agregar').textContent = 'Editar Producto';
Edicion = true;
cogidoAEditar = productoCodigo;

       }
        
    }
})

formulario.addEventListener("submit", (event) => { //agregamos el evento al formulario cuando se envia
    event.preventDefault(); //evitamos que se recargue la pagina

    const codigo = document.getElementById('codigo').value; //obtenemos los valores ingresados en el form
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;

    if (Edicion){
        Producto.editarProducto(cogidoAEditar, nombre, precio, descripcion, imagen);
        Edicion = false;
        cogidoAEditar = null;
        document.getElementById('agregar').textContent = 'Agregar Producto';
    } else{
        Producto.crear(codigo, nombre, precio, descripcion, imagen);
    }

    updateTablaProductos(); //actualizamos la tabla
    formulario.reset()

});

document.addEventListener('DOMContentLoaded', updateTablaProductos);

