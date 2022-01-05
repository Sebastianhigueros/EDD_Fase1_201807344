class nodoVenta{
    constructor(id,vendedor,cliente){
        this.id = id;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.productos = new ListaProductos();
        this.total = 0;
    }
}

class nodoProducto{
    constructor(id,nombre,cantidad,precio){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.siguiente = null;
        this.anterior = null;
    }
}

class TablaVentas{
    constructor(){
        this.tabla = this.iniciarTabla(7);
        this.tamano = 7;
        this.posOcupadas = 0;
    }

    iniciarTabla(tamano){
        let tabla = [];
        for(var i =0; i < tamano; i++){
            tabla[i] = null;
        }
        return tabla;
    }


    calcularPosicion(id){
        let pos = id % this.tamano;
        return pos;
    }

    agregarVenta(id,vendedor,cliente){
        let nuevaVenta = new nodoVenta(id,vendedor,cliente);
        let posicion = this.calcularPosicion(id);
        if(this.tabla[posicion] == null){
            this.tabla[posicion] = nuevaVenta;
            this.posOcupadas +=1;
        }else{
            posicion = this.resolverColisiones(posicion);
            this.tabla[posicion] = nuevo;
            this.posOcupadas += 1;
        }

        let densidadPosiciones = this.posOcupadas/this.tamano;

        if(densidadPosiciones > 0.5){
            this.redimensionar();
        }

    }

    redimensionar(){
        let esPrimo = false;
        let nuevoTamano = this.tamano;
        while(!esPrimo){
            nuevoTamano += 1;
            let j = 0;
            for(var i = nuevoTamano; i >0;i--){
                if(nuevoTamano % i == 0){
                    j +=1;
                }
            }

            if(j == 2){
                esPrimo= true;
            }

        }

        let temp = this.tabla;
        this.tamano = nuevoTamano;
        this.tabla = this.iniciarTabla(nuevoTamano);
        this.posOcupadas = 0;

        for(var i = 0;i < temp.length;i++){
            if(temp[i] != null){
                this.agregarVenta(temp[i].id,temp[i].vendedor,temp[i].cliente);
                this.tabla[i].productos = temp[i].productos;
                this.tabla[i].total = temp[i].total;
            }
        }
    }

    resolverColisiones(posicion){
        let nuevaPosicion = 0;
        let i =0;
        let espaciovacio = false;
        while(!espaciovacio){
            nuevaPosicion = posicion + (i*i);
            if(nuevaPosicion >= this.tamano){
                nuevaPosicion = nuevaPosicion-this.tamano;
            }

            if(this.tabla[nuevaPosicion] == null){
                espaciovacio = true;
            }
            i+=1;
        }
        return nuevaPosicion
    }
    agregarProductos(idVenta,idproducto,nombreProducto,precio,cantidad){
        for(var i = 0; i < this.tamano;i++){
            if(this.tabla[i] != null){
                if(this.tabla[i].id == idVenta){
                    let prods = this.tabla[i].productos;
                    prods.agregarProducto(idproducto,nombreProducto,precio,cantidad);
                    break;
                }
            }
        }

        
    }
    obtenerTotal(idVenta){
        for(var i = 0; i < this.tamano;i++){
            if(this.tabla[i] != null){
                if(this.tabla[i].id == idVenta){
                    let total = this.tabla[i].productos.calcularTotal();
                    this.tabla[i].total = total;
                }
            }
        }
    }

    graficar(){
        let texto = "digraph ventas{\n"
        texto += "\trankr=TB;\n";
        texto += "\tnode[shape= box]\n";
        for(var i = 0; i < this.tamano; i++){
            if(this.tabla[i] != null){
                texto += "\tnode[label=\"id: "+this.tabla[i].id+"\n\tCliente: "+this.tabla[i].cliente+"\n\tTotal: "+this.tabla[i].total+"\"]n"+i+";\n";
                let productos = this.tabla[i].productos.inicio;
                while(productos != null){
                    texto += "\tnode[label= \"nombre: "+productos.nombre+"\n\tcantidad: "+productos.cantidad+"\n\tprecio: "+productos.precio+"\"]p"+i+productos.id+";\n";
                    productos = productos.siguiente;
                }
                productos = this.tabla[i].productos.inicio;
                if(productos != null){
                    texto += "\tn"+i+"-> p"+i+productos.id+"\n";
                }
                while(productos.siguiente != null){
                    texto += "p"+i+productos.id+'->p'+i+productos.siguiente.id+"\n";
                    productos = productos.siguiente;
                }

            }else{
                texto += "\tnode[label="+'""]n'+i+";\n";
            }
        }

        texto += "}"
        return texto;

    }

    graficaPorVendedor(idventa,usuario){
        let texto = "digraph venta{\n"
        texto += "\trankr=TB;\n";
        texto += "\tnode[shape= box]\n";
        for(var i = 0; i < this.tamano; i++){
            if(this.tabla[i].vendedor == usuario && this.tabla[i].id == idventa){
                texto += "\tnode[label=\"id: "+this.tabla[i].id+"\n\tCliente: "+this.tabla[i].cliente+"\n\tTotal: "+this.tabla[i].total+"\"]n"+i+";\n";
                while(productos != null){
                    texto += "\tnode[label= \"nombre: "+productos.nombre+"\n\tcantidad: "+productos.cantidad+"\n\tprecio: "+productos.precio+"\"]p"+i+productos.id+";\n";
                    productos = productos.siguiente;
                }
                productos = this.tabla[i].productos.inicio;
                if(productos != null){
                    texto += "\tn"+i+"-> p"+i+productos.id+"\n";
                }
                while(productos.siguiente != null){
                    texto += "p"+i+productos.id+'->p'+i+productos.siguiente.id+"\n";
                    productos = productos.siguiente;
                }
            }

        }
        texto +="}"
        return texto;
    }
}



class ListaProductos{
    constructor(){
        this.inicio = null;
    }
    
    agregarProducto(id,nombre,cantidad,precio){
        let producto = new nodoProducto(id,nombre,cantidad,precio);

        if(this.inicio == null){
            this. inicio = producto;
            this.tam++;
            return producto;
        }else{
            let temp = this.inicio;
            while(temp.siguiente != null){
                temp = temp.siguiente
            }
            temp.siguiente = producto;
            producto.anterior = temp;
            this.tam++
            return producto;
        }
    }

    calcularTotal(){
        let total = 0;

        let temp = this.inicio;
        while(temp != null){
            total += temp.precio*temp.cantidad;
            temp = temp.siguiente;
        }

        return total;
    }
}
