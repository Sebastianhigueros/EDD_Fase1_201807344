class NodoProveedor{
    constructor(id,nombre,direccion,telefono,correo){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }
}

class ArbolProveedores{
    constructor(){
        this.inicio = null;
        this.izquierda = null;
        this.derecha = null;
    }

    agregarPrimerProveedor(id,nombre,direccion,telefono,correo){
        let nuevoProveedor = new NodoProveedor(id,nombre,direccion,telefono,correo);
        if(this.inicio == null){
            this.inicio = nuevoProveedor;
        }else{
            this.agregarProveedor(this.inicio,nuevoProveedor);
        }
    }
    agregarProveedor(proveedorActual,nuevoProveedor){
        if(proveedorActual == null){
            proveedorActual = nuevoProveedor;
            return proveedorActual
        }else{
            if(nuevoProveedor.id < proveedorActual.id){
                proveedorActual.izquierda = this.agregarProveedor(proveedorActual.izquierda,nuevoProveedor);
            }else if(nuevoProveedor.id > proveedorActual.id){
                proveedorActual.derecha = this.agregarProveedor(proveedorActual.derecha,nuevoProveedor)
            }else{
                alert("Error: el proveedor ya existe");
            }
        }
    }

}
