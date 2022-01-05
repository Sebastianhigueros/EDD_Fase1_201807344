class nodoInventario{
    constructor(id,nombre,precio,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.siguiente = null;
        this.anterior = null;
        this.izquierda = null;
        this.derecha = null;
    }

}

class Listavalores{
    constructor(){
        this.inicio = null;
        this.fin = null;
        this.tam = 0;
    }

    insertarValor(valor){
        if(this.inicio == null && this.fin == null){
            this.inicio = valor;
            this.fin = valor;
            this.tam += 1;
            return valor;
        }else{
            if(this.inicio == this.fin){
                if(this.fin.id < valor.id){
                    this.fin.siguiente = valor;
                    valor.anterior = this.fin;
                    this.fin.derecha = valor.izquierda;
                    this.fin = valor;
                    this.tam += 1;  
                    return valor;                 
                }else if(this.inicio.id > valor.id){
                    valor.siguiente = this.inicio;
                    this.inicio.anterior = valor;
                    this.inicio.izquierda = valor.derecha;
                    this.inicio = valor;
                    this.tam += 1;
                    return valor;
                }else{
                    return null;
                }
            }else{
                if(this.inicio.id > valor.id){
                    valor.siguiente = this.inicio;
                    this.inicio.anterior = valor;
                    this.inicio.izquierda = valor.derecha;
                    this.inicio = valor;
                    this.tam += 1;
                    return valor
                }else if(this.fin.id < valor.id){
                    this.fin.siguiente = valor;
                    valor.anterior = this.fin;
                    this.fin.derecha = valor.izquierda;
                    this.fin = valor;
                    this.tam += 1;
                    return valor;
                }else{
                    let temp = this.inicio;

                    while(temp != null){
                        if(temp.id > valor.id){
                            valor.siguiente = temp;
                            valor.anterior = temp.anterior;
                            temp.anterior.siguiente = valor;
                            temp.izquierda = valor.derecha;
                            temp.anterior.derecha = valor.izquierda;
                            temp.anterior = valor;
                            this.tam +=1;
                            return valor;
                        }else if(temp.id == valor.id){
                            return null;
                        }else{
                            temp = temp.siguiente;
                        }
                    }
                }
            }
        }
    }
}

class NodoArbol{
    constructor(){
        this.esRaiz = false;
        this.valoresMaximo = 4;
        this.valoresMinimo = 2;
        this.Valores = new Listavalores();
        this.tamano = 0;
    }

    InsertarNodo(valor){
        let val = this.Valores.insertarValor(valor);
        if(val != null){
            this.tamano = this.Valores.tam;
            if(this.tamano == 5){
                return this.dividirNodo(this);
            }else if(this.tamano < 5){
                return this;
            }
        }
        return null;
    }

    dividirNodo(nodo){
        let temp = nodo.Valores.inicio;
        let i = 0;
        while(i < 2){
            temp = temp.siguiente;
            i +=1;
        }

        let primerValor = nodo.Valores.inicio;
        let segundoValor = primerValor.siguiente;
        let tercerValor = temp.siguiente;
        let cuartoValor = nodo.Valores.fin;

        primerValor.siguiente = segundoValor.siguiente = tercerValor.siguiente = cuartoValor.siguiente = temp.siguiente = null;
        primerValor.anterior = segundoValor.anterior = tercerValor.anterior = cuartoValor.anterior = temp.anterior = null;

        let nuevoNodoIz = new NodoArbol();

        nuevoNodoIz.InsertarNodo(primerValor);
        nuevoNodoIz.InsertarNodo(segundoValor);

        let nuevoNodoDer = new NodoArbol();

        nuevoNodoDer.InsertarNodo(tercerValor);
        nuevoNodoDer.InsertarNodo(cuartoValor);


        temp.izquierda = nuevoNodoIz;
        temp.derecha = nuevoNodoDer;

        return temp;
    }

    nodoHoja(nodo){
        let temp = nodo.Valores.inicio;
        if(temp.izquierda != null){
            return false;
        }
        return true;
    }

}

class ArbolInventario{
    constructor(){
        this.raiz = null;
        this.altura = 0;
        this.orden = 5;
    }

    agregarItem(id,nombre,precio,cantidad){
        let nuevoItem = new nodoInventario(id,nombre,precio,cantidad);

        if(this.raiz == null){
            this.raiz = new NodoArbol();
            this.raiz.esRaiz = true;
            this.raiz = this.raiz.InsertarNodo(nuevoItem);
        }else{
            if(this.altura != 0){
                if(this.raiz != null){
                    let obtenido = this.insertar(nuevoItem,this.raiz);
                    if(obtenido instanceof nodoInventario){
                        this.altura += 1;
                        this.raiz = new NodoArbol();
                        this.raiz = this.raiz.InsertarNodo(obtenido);
                    }else if(obtenido instanceof NodoArbol){
                        this.raiz = obtenido;
                    }
                }else{
                    return null;
                }
            }else{
                let obtenido = this.raiz.InsertarNodo(nuevoItem);
                if(obtenido instanceof NodoArbol){
                    this.raiz = obtenido;
                }else{
                    this.altura += 1;
                    this.raiz = new NodoArbol();
                    this.raiz = this.raiz.InsertarNodo(obtenido);
                }
            }
        }
    }

    insertar(nuevoItem,nodoActual){
        if(nodoActual.nodoHoja(nodoActual)){
            let obtenido = nodoActual.InsertarNodo(nuevoItem);
            return obtenido;
        }else{
            let valorInicial = nodoActual.Valores.inicio;
            if(valorInicial.id > nuevoItem.id){
                let obtenido = this.insertar(nuevoItem,valorInicial.izquierda);
                if(obtenido instanceof nodoInventario){
                    return nodoActual.InsertarNodo(obtenido);
                }else if(obtenido instanceof NodoArbol){
                    nodoActual.Valores.inicio.izquierda = obtenido;
                    return nodoActual;
                }
            }else if(valorInicial.id < nuevoItem.id){
                let obtenido = this.insertar(nuevoItem,valorInicial.derecha);
                if(obtenido instanceof nodoInventario){
                    return nodoActual.InsertarNodo(obtenido);
                }else if(obtenido instanceof NodoArbol){
                    nodoActual.Valores.inicio.derecha = obtenido;
                    return nodoActual;
                }
            }else{
                while(valorInicial != null){
                    if(valorInicial.id > nuevoItem.id){
                        let obtenido = this.insertar(nuevoItem,valorInicial.izquierda);
                        if(obtenido instanceof nodoInventario){
                            return nodoActual.InsertarNodo(obtenido)
                        }else if(obtenido instanceof NodoArbol){
                            valorInicial.anterior.derecha = obtenido;
                            valorInicial.izquierda = obtenido;
                            return nodoActual;
                        }
                    }else if(valorInicial.id == nuevoItem.id){
                        return nodo;
                    }else{
                        valorInicial = valorInicial.siguiente;
                    }
                }
            }
        }
        return this;
    }


    busqueda(nodoActual,idproducto){
        let esHoja = false;
        let tempnodo = nodoActual.Valores.inicio
        if(tempnodo.izquierda != null){
            esHoja = false;
        }else if(tempnodo.izquierda == null){
            esHoja = true;
        }

        if(esHoja){
            let temp = nodoActual.Valores.inicio;
            while(temp != null){
                if(temp.id == idproducto){
                    return temp;
                }
                temp = temp.siguiente;
            }
        }else{
            let temp = nodoActual.Valores.inicio;
            if(temp.id == idproducto){
                return temp;
            }else if(temp.id > idproducto){
                return this.busqueda(temp.izquierda,idproducto);
            }else if(temp.id < idproducto){
                if(temp == this.nodoHoja.Valores.fin){
                    return this.busqueda(temp.derecha,idproducto);
                }else{
                    temp = temp.siguiente;
                }
            }
        }
    }


    graficaNodos(nodoActual){
        let texto = "";
        let esHoja = false;
        let tempnodo = nodoActual.Valores.inicio;
        if(tempnodo.izquierda != null){
            esHoja = false;
        }else if(tempnodo.izquierda == null){
            esHoja = true;
        }

        if(esHoja){
            texto += "node[label=\"<p0>";
            let i = 0;
            let temp = nodoActual.Valores.inicio;
            while(temp != null){
                i += 1
                texto += "|id: "+temp.id+"\n"+"Nombre: "+temp.nombre+"\n"+"precio: "+temp.precio+"\n"+"cantidad: "+temp.cantidad+"|<p"+i+'>';
                temp = temp.siguiente
            }
            texto += "\"]"+nodoActual.Valores.inicio.id+"; \n";

            return texto;
        }else{
            texto += "node[label=\"<p0>";
            let i = 0
            let temp = nodoActual.Valores.inicio;
            while(temp != null){
                i += 1;
                texto += "|id: "+temp.id+"\n"+"Nombre: "+temp.nombre+"\n"+"precio: "+temp.precio+"\n"+"cantidad: "+temp.cantidad+"|<p"+1+">";
                temp = temp.siguiente
            }
            texto += "\"]"+nodoActual.Valores.inicio.id+"; \n";


            temp = nodoActual.Valores.inicio;
            while(temp != null){
                texto += this.graficaNodos(temp.izquierda);
                temp = temp.siguiente;
            }
            texto += this.graficaNodos(nodoActual.Valores.fin.derecha);

            return texto;
        }
    }

    graficaEnlace(nodoActual){
        let texto = "";
        let esHoja = false;
        let tempnodo = nodoActual.Valores.inicio;
        if(tempnodo.izquierda != null){
            esHoja = false;
        }else if(tempnodo.izquierda == null){
            esHoja = true;
        }

        if(esHoja){
            return nodoActual.Valores.inicio.id+";\n";
        }else{
            let temp = nodoActual.Valores.inicio;
            let idNodo = nodoActual.Valores.inicio.id;
            let i = 0;
            while(temp != null){
                texto += "\n"+idNodo+":p"+i+"->"+this.graficaEnlace(temp.izquierda);
                temp = temp.siguiente;
                i += 1;
            }
            texto +="\n"+idNodo+":p"+i+"->"+this.graficaEnlace(nodoActual.Valores.fin.derecha);
            return texto;
        }
    }

}

