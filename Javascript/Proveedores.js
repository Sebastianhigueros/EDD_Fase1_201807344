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
            return this.inicio;
        }else{
            return this.agregarProveedor(this.inicio,nuevoProveedor);
        }
    }
    agregarProveedor(proveedorActual,nuevoProveedor){
        if(proveedorActual == null){
            proveedorActual = nuevoProveedor;
            return proveedorActual;
        }else{
            if(nuevoProveedor.id < proveedorActual.id){
                proveedorActual.izquierda = this.agregarProveedor(proveedorActual.izquierda,nuevoProveedor);
            }else if(nuevoProveedor.id > proveedorActual.id){
                proveedorActual.derecha = this.agregarProveedor(proveedorActual.derecha,nuevoProveedor);
            }else{
                return null;
            }
            return proveedorActual;
        }
    }
    
    obtenerPrimerProveedor(id){
        if(this.inicio.id == id){
            return this.inicio;
        }else{
            this.obtenerProveedor(this.inicio,id);
        }
    }

    obtenerProveedor(proveedorActual,id){
        if(proveedorActual.id == id){
            return proveedorActual;
        }else{
            let temp = proveedorActual;
            if(temp.id > id){
                return this.obtenerProveedor(temp.izquierda,id);
            }else if(temp.id < id){
                return this.obtenerProveedor(temp.derecha,id);
            }else{
                alert('Error: No se encontro al proveedor');
            }
        }
    }


    graficarArbol(){
        let texto = "digraph proveedores{\n";

        texto += "\n"+this.graficarNodos(this.inicio);
        texto += "\n"+this.graficarEnlaces(this.inicio);

        texto += "}";

        return texto

    }

    graficarNodos(proveedorActual){
        let texto = "";
        if(proveedorActual != null){
            
            texto += "node[label="+'"'+"nombre: "+proveedorActual.nombre+" direccion: "+proveedorActual.direccion+" telefono: "+proveedorActual.telefono+" correo: "+proveedorActual.correo+'"]'+proveedorActual.id+'\n';
            texto += this.graficarNodos(proveedorActual.izquierda);
            texto += this.graficarNodos(proveedorActual.derecha);
        }
        return texto
    }

    graficarEnlaces(proveedorActual){
        let texto = "";
        if(proveedorActual != null){
        

            if(proveedorActual.derecha != null){
                texto += proveedorActual.id+"->"+proveedorActual.derecha.id+'\n';
            }

            if(proveedorActual.izquierda != null){
                texto += proveedorActual.id+"->"+proveedorActual.izquierda.id+'\n';
            }

            texto += this.graficarEnlaces(proveedorActual.izquierda);
            texto += this.graficarEnlaces(proveedorActual.derecha);

        }
        return texto
    }

}

