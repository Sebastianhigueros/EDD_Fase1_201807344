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
            return this.inicio;
        }else{
            let temp = this.inicio;

            while(temp.siguiente != null){
                temp = temp.siguiente
            }
            temp.siguiente = nuevoCliente;
            nuevoCliente.anterior = temp;
            return nuevoCliente;
        }
    }


    EliminarCliente(id){
        if(this.inicio != null){
            let temp = this.inicio;
            while(temp != null){
                if(temp.id == id){
                    if(temp.siguiente != null && temp.anterior != null){
                        temp.anterior.siguiente = temp.siguiente;
                        temp.siguiente.anterior = temp.anterior;
                        temp.id = '';
                        temp.nombre = ''
                        temp.correo = '';
                        return true;
                    }else if(temp.siguiente == null && temp.anterior != null){
                        temp.anterior.siguiente = null;
                        return true
                    }else if(temp.siguiente != null && temp.anterior == null){
                        temp.siguiente.anterior = null;
                        this.inicio = temp.siguiente;
                        return true;
                    }else{
                        this.inicio = null;
                        return true;
                    }
                }
                temp = temp.siguiente;
            }
            return false;
        }else{
            return false;
        }
        
    }

    obtenerCliente(id){
        if(this.inicio != null){
            let temp = this.inicio;
            while(temp != null){
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

    ModificarCliente(id,nombre,correo){
        let cliente = this.obtenerCliente(id);
        if(cliente != null){
            if(nombre != ""){
                cliente.nombre = nombre;
            }
            if(correo != ""){
                cliente.correo = correo;
            }
            alert("Modificacion exitosa!");
            return true;
        }else{
            alert("El cliente no existe");
            return false;
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







