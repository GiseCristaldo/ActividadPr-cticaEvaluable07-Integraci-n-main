export class Producto { //definimos la clase llamada producto que es exportable
    //constructor tomamos un nuevo producto y le asignamos cada propiedad a la nueva instancia de producto
    static items = [];


    constructor(codigo, nombre, precio, descripcion, imagen) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;

    }

    static cargarDelLocalStorage() {
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            const productos = JSON.parse(productosGuardados);
            this.items = productos.map(p => new Producto(p.codigo, p.nombre, p.precio, p.descripcion, p.imagen));
            console.log("Productos cargados:", this.items);
        } else {
            this.items = [];
        }
    }
    static guardaProductos() {
        localStorage.setItem('productos', JSON.stringify(this.items));
    }
    static crear(codigo, nombre, precio, descripcion, imagen) {
        let producto = new Producto(codigo, nombre, precio, descripcion, imagen);
        this.items.push(producto);
        this.guardaProductos();
    }


    //llamamos al metodo estatico desde la clase, tomamos un objeto de producto  lo pusheamos al array items que es global

    static eliminarProducto(codigo) {
        Producto.items = Producto.items.filter((item) => item.codigo !== codigo);
        this.guardaProductos();
    }


    static editarProducto(codigo, nombreEditado, precioEditado, descripcionEditada, imagenEditada) {

        let productoAEditar = Producto.items.find((item) => item.codigo === codigo);
        
        if (productoAEditar){
            productoAEditar.nombre = nombreEditado;
            productoAEditar.precio = precioEditado;
            productoAEditar.descripcion = descripcionEditada;
            productoAEditar.imagen = imagenEditada;
            this.guardaProductos();
        }

       
    }
};



