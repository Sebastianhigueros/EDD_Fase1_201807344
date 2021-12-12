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

    mostrarLista(){
        let temp = this.inicio;
        while(temp != null){
            console.log("id: "+temp.id+", nombre: "+temp.nombre+", correo: "+temp.correo)
            temp = temp.siguiente
        }
    }

    
}


