import { Producto } from "../../classes/Producto.js"; 

export class ItemCarrito {
    static itemsCarrito = [];

    constructor(codigo, nombre, precio, descripcion, imagen, cantidad = 1) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }


    static cargaDelLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (!carritoGuardado) {
            this.itemsCarrito = []; 
            console.log("El carrito está vacío");
            return;
        }

        const carrito = JSON.parse(carritoGuardado);
        this.itemsCarrito = carrito.map(item => ({
            producto: new Producto(
                item.producto.codigo,
                item.producto.nombre,
                item.producto.precio,
                item.producto.descripcion,
                item.producto.imagen
            ),
            cantidad: item.cantidad
        }));
        console.log("Carrito cargado:", this.itemsCarrito);
    }
    static agregarAlCarrito(producto) {
        const itemEnCarrito = this.itemsCarrito.find(item => item.producto.codigo === producto.codigo);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1; // Aumentar cantidad
        } else {
            this.itemsCarrito.push({ producto, cantidad: 1 }); // Agregar nuevo producto
        }
        this.guardarEnLocalStorage();
    }

    static guardarEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(this.itemsCarrito));
    }

    static calcularTotales() {
        let subtotal = 0;
        this.itemsCarrito.forEach(item => {
            subtotal += item.producto.precio * item.cantidad;
        });
        return {
            subtotal,
           
        };
    }
    static eliminarDelCarrito(codigo) {
        const item = this.itemsCarrito.find(item => item.producto.codigo === codigo);
        if (item) {
            if (item.cantidad > 1) {
                item.cantidad -= 1; // Decrementar cantidad
            } else {
                this.itemsCarrito = this.itemsCarrito.filter(item => item.producto.codigo !== codigo); // Eliminar del carrito
            }
            this.guardarEnLocalStorage();
        }
    }
}
