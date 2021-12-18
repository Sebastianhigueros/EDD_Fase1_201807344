class NodoClientes{
    constructor(id,nombre,correo){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCliente{
    constructor(){
        this.inicio = null;
    }

    agregarCliente(id,nombre,correo){
        let nuevoCliente = new NodoClientes(id,nombre,correo)

        if(this.inicio == null){
            this.inicio = nuevoCliente;
        }else{
            let temp = this.inicio;

            while(temp.siguiente != null){
                temp = temp.siguiente
            }
            temp.siguiente = nuevoCliente;
            nuevoCliente.anterior = temp;
        }
    }


    EliminarCliente(id){
        if(this.inicio != null){
            let temp = this.inicio;
            while(temp.siguiente != null){
                if(temp.id == id){
                    temp.anterior.siguiente = temp.siguiente;
                    temp.siguiente.anterior = temp.anterior;
                    temp.id = '';
                    temp.nombre = ''
                    temp.correo = '';
                }
                temp = temp.siguiente;
            }
        }
    }

    obtenerCliente(id){
        if(this.inicio != null){
            let temp = this.inicio;
            while(temp.siguiente != null){
                if(temp.id == id){
                    return temp;
                }
                temp = temp.siguiente;
            }
        }else{
            alert("Error: lista de clientes vacia");
            return null;
        }

    }

    Graficar(){
        let texto = ""
        let temp = this.inicio;
        texto = "digraph Clientes{\n"
        while(temp != null){
            texto += "\tnode[label="+'"'+"cliente: "+ temp.nombre +" correo: "+temp.correo+'"]'+temp.id+"\n"; 
            temp = temp.siguiente
        }
        temp = this.inicio;
        while(temp.siguiente != null){
            texto += "\t"+temp.id+"->"+temp.siguiente.id+"\n";
            texto += "\t"+temp.siguiente.id+"->"+temp.id+"\n";
            temp = temp.siguiente
        }

        texto +="}"

        return texto;

    }


    
}

let listaPrueba = new ListaCliente();

listaPrueba.agregarCliente(0,"sebastian","sebas@gmail.com");
listaPrueba.agregarCliente(1,"admin","admin@yahoo.com");

let grafica = listaPrueba.Graficar();

console.log(grafica)


