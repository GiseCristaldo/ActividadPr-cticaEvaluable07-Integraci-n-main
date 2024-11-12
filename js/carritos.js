import { ItemCarrito } from "../../classes/carrito.js"; 
import { Producto } from "../../classes/Producto.js"; // Asegúrate de que la ruta sea correcta

document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Cargado");
    
    // Verificar el estado del localStorage
    console.log("Contenido del localStorage:");
    //console.log("productos:", localStorage.getItem('productos'));
    //console.log("carrito:", localStorage.getItem('carrito'));
    // Cargar productos y carrito
    Producto.cargarDelLocalStorage();
    console.log("Productos cargados:", Producto.items);

    ItemCarrito.cargaDelLocalStorage();
    //console.log("Carrito cargado:", ItemCarrito.itemsCarrito);
    mostrarCarrito();
});


document.addEventListener('DOMContentLoaded', function(){
    Producto.cargarDelLocalStorage();
    console.log(JSON.parse(localStorage.getItem('productos'))); 
    ItemCarrito.cargaDelLocalStorage();
    mostrarCarrito();
})
function calcularTotales() {
    let subtotal = 0;
    ItemCarrito.itemsCarrito.forEach(item => {
        subtotal += item.producto.precio * item.cantidad;
    });
    return {
        subtotal: subtotal,
        total: subtotal
    };
    
}
function actualizarTotalEnDOM(){
    const totalContainer = document.getElementById('total-container');
    const totales = calcularTotales();
    totalContainer.innerHTML = ` 
    <div class="totales-desglose">
    <p class="subtotal"> Subtotal: $${totales.subtotal.toLocaleString()}</p>
    <p class="total"> Total: $${(totales.total.toLocaleString())}</p>
    </div>
    `
}

function mostrarCarrito(){
    let carritoContainer = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total-container');
    carritoContainer.innerHTML = '';

    if (ItemCarrito.itemsCarrito.length === 0){
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
        totalContainer.innerHTML = '';
        return
    } 
    
    ItemCarrito.itemsCarrito.forEach(item => {
          
            const div = document.createElement('div');
            div.classList.add('carrito-item');
            div.innerHTML = `
            <img src="${item.producto.imagen}" alt="${item.producto.nombre}" class="product-image">
            <div class="producto-info">
                <h3 class="product-name">${item.producto.nombre}</h3>
                <p class="product-precio">$ ${item.producto.precio.toLocaleString()}</p>
            </div>
            <div class="cantidad-controls-carrito">
                <button class="control-cantidad decrementar" data-codigo="${item.producto.codigo}">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="control-cantidad incrementar" data-codigo="${item.producto.codigo}">+</button>
            </div>
            <p class="subtotal-item">$${(item.producto.precio * item.cantidad).toLocaleString()}</p>
            <button class="eliminar-carrito" data-codigo="${item.producto.codigo}">Eliminar</button>

        `;
        carritoContainer.appendChild(div);
    });
    actualizarTotalEnDOM();

}
// Escuchar los eventos para los botones de +, -, y eliminar
document.getElementById('carrito-container').addEventListener('click', (event) => {
    const codigo = event.target.dataset.codigo;
    if (!codigo) return;

    if (event.target.classList.contains('incrementar')) {
        const item = ItemCarrito.itemsCarrito.find(item => item.producto.codigo === codigo);
        if (item) {
            item.cantidad += 1;
            ItemCarrito.guardarEnLocalStorage();
            mostrarCarrito();
        }
    } else if (event.target.classList.contains('decrementar')) {
        const item = ItemCarrito.itemsCarrito.find(item => item.producto.codigo === codigo);
        if (item && item.cantidad > 1) {
            item.cantidad -= 1;
            ItemCarrito.guardarEnLocalStorage();
            mostrarCarrito();
        }
    } else if (event.target.classList.contains('eliminar-carrito')) {
        ItemCarrito.eliminarDelCarrito(codigo);
        mostrarCarrito();
    }
});