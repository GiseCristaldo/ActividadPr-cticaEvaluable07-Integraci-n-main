import { Producto } from '/classes/Producto.js'
import { ItemCarrito } from "/classes/carrito.js";

document.addEventListener('DOMContentLoaded', function () {
    console.log('esto cargo');
    Producto.cargarDelLocalStorage();
    ItemCarrito.cargaDelLocalStorage();


    let productoConteiner = document.getElementById('lista-product');

    Producto.items.forEach((producto) => {
        //creamos a la vez una nueva fila tr para cada producto
        const card = document.createElement('div');
        card.classList.add('producto-card');

        card.innerHTML = `
        <img src="${producto.imagen}" alt="Imagen del producto" class="product-image">
            <h3 class="product-name">${producto.nombre}</h3>
            <h3 class="product-precio">${producto.precio}</h3>
            <h3 class="product-descripcion">${producto.descripcion}</h3>
            <button class="agregar-carrito" data-codigo="${producto.codigo}">Agregar al carrito</button>
        `;
        productoConteiner.appendChild(card);
    });

    //agregamos el producto al carrito
    productoConteiner.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregar-carrito')) {
            let codigo = event.target.dataset.codigo;
            let producto = Producto.items.find(p => p.codigo === codigo);
            if (producto) {
                console.log("Producto a agregar:", producto);
                ItemCarrito.agregarAlCarrito(producto);
                alert('Producto agregado al carrito');
                actualizarBotonCarrito();
                // Verificar el estado del carrito después de agregar
            console.log("Estado del carrito:", ItemCarrito.itemsCarrito);
            console.log("LocalStorage carrito:", localStorage.getItem('carrito'));
            }
        }
    });
});

function actualizarBotonCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('botonCarrito').textContent = `Carrito (${cantidadTotal})`;
}

//let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//let cantidadDeProductos = carrito.length;
//document.getElementById('botonCarrito').textContent = `Carrito (${cantidadDeProductos})`;


actualizarBotonCarrito();

document.addEventListener('DOMContentLoaded', actualizarBotonCarrito);

