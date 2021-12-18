

class NodoMeses{
    constructor(numeroMes,mes){
        this.numeroMes = numeroMes;
        this.mes = mes
        this.siguiente = null;
        this.anterior = null;
        //this.calendario = new Calendario();
    }
}

class ListaMeses{
    constructor(){
        this.inicio = null;
    }

    insertarMes(numeroMes,mes){
        let nuevoMes = new NodoMeses(numeroMes,mes);
        if(this.inicio == null){
            this.inicio = nuevoMes;
        }else{
            let tamano = this.tamanoLista()
            if (tamano < 12){
                if(nuevoMes.numeroMes < this.inicio.numeroMes){
                    nuevoMes.siguiente = this.inicio;
                    this.inicio.anterior = nuevoMes;
                    this.inicio = nuevoMes;
                }else if(nuevoMes.numeroMes > this.inicio.numeroMes){
                    if(this.inicio.siguiente == null){
                        this.inicio.siguiente = nuevoMes;
                        nuevoMes.anterior = this.inicio;
                    }else{
                        let temp = this.inicio;
                        while(temp != null){
                            if(nuevoMes.numeroMes < temp.numeroMes){
                                nuevoMes.siguiente = temp;
                                nuevoMes.anterior = temp.anterior;
                                temp.anterior.siguiente = nuevoMes;
                                temp.anterior = nuevoMes;
                            }else{
                                temp.siguiente = nuevoMes;
                                nuevoMes.anterior = temp;
                            }
                            temp = temp.siguiente;
                        }
                    }
                }
            }

        }
    }


    tamanoLista(){
        let contador = 0;
        if(this.inicio == null){
            contador = 0;
            return contador;
        }else{
            let temp = this.inicio;
            while(temp != null){
                contador +=1;
                temp = temp.siguiente;
            }
            return contador;
        }
    }

    MostrarMeses(){
        let temp = this.inicio;
        while(temp != null){
            console.log(temp.numeroMes+', ' + temp.mes)
            temp = temp.siguiente
        }
    }

    graficarMeses(){
        let texto = ""
        let temp = this.inicio;
        texto = "digraph Meses{\n"
        while(temp != null){
            texto += "\tnode[label="+'"'+"Mes: "+ temp.mes +'"]'+temp.numeroMes+"\n"; 
            temp = temp.siguiente
        }
        temp = this.inicio;
        while(temp.siguiente != null){
            texto += "\t"+temp.numeroMes+"->"+temp.siguiente.numeroMes+"\n";
            texto += "\t"+temp.siguiente.numeroMes+"->"+temp.numeroMes+"\n";
            temp = temp.siguiente
        }

        texto +="}"

        return texto;
    }
}

let meses = new ListaMeses()
meses.insertarMes(12,'Diciembre');
meses.insertarMes(2,'febrero');

let graficaMeses = meses.graficarMeses();

console.log(graficaMeses);
