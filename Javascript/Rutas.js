class nodoGrafo{
    constructor(id,nombre){
        this.id = id;
        this.nombre = nombre;
        this.ponderacion = 0;
        this.siguiente = null;
        this.anterior = null;
        this.adyacentes = new listaAdyacentes();

    }
}

class listaAdyacentes{
    constructor(){
        this.inicio = null;
        this.fin = null;
    }

    agregarAdyacente(id,nombre,ponderacion){
        let nuevoNodo = new nodoGrafo(id,nombre);
        nuevoNodo.ponderacion = ponderacion
        if(this.inicio == null){
            this.inicio = nuevoNodo;
            this.fin = nuevoNodo;
        }else if(this.inicio == this.fin){
            this.inicio.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.inicio;
            this.fin = nuevoNodo;
        }else if(this.inicio != this.fin){
            this.fin.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.fin;
            this.fin = nuevoNodo;
        }
    }
}

class grafoRutas{
    constructor(){
        this.inicio = null;
        this.fin = null;
    }

    agregarNodo(id,nombre){
        let nuevoNodo= new nodoGrafo(id,nombre)
        if(this.inicio == null){
            this.inicio = nuevoNodo;
            this.fin = nuevoNodo;
        }else if(this.inicio == this.fin){
            this.inicio.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.inicio;
            this.fin = nuevoNodo;
        }else if(this.inicio != this.fin){
            this.fin.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.fin;
            this.fin = nuevoNodo;
        }

    }

    agregaradyacentes(id,idAyacente,nombre,ponderacion){
       let nodo = this.buscarnodo(id);
        if(nodo != null){
            nodo.adyacentes.agregarAdyacente(idAyacente,nombre,ponderacion);
            return nodo;
        }else{
            return null
        }
    }

    buscarnodo(id){
        let temp = this.inicio;
        while(temp != null){
            if(temp.id == id){
                return temp;
            }
            temp = temp.siguiente;
        }
        return null;
    }

    graficarGrafo(){
        let texto = "digraph rutas{\n";
        texto += "\trankdir=\"LR\"\n"
        let temp = this.inicio;
        while(temp != null){
            texto += "\tnode[label=\"id: "+temp.id+"\nnombre: "+temp.nombre+"\"]n"+temp.id+";";
            temp = temp.siguiente;
        }

        temp = this.inicio;
        while(temp != null){
            let adyacentes = temp.adyacentes.inicio;
            while(adyacentes != null){
                texto += "\tn"+temp.id+"-> n"+adyacentes.id+"[label=\""+adyacentes.ponderacion+"\"];\n";
                adyacentes = adyacentes.siguiente;
            }
            temp = temp.siguiente;
        }
        texto += "}"

        return texto;
    }

}
