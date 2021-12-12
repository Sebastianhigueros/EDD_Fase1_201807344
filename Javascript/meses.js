

class NodoMeses{
    constructor(mes){
        this.numeroMes = 0;
        this.mes = mes
        this.siguiente = null;
        this.anterior = null;
        this.calendario = null;
    }
}

class ListaMeses{
    constructor(){
        this.inicio = null;
    }

    insertarMes(mes){
        let nuevoMes = new NodoMeses(mes);
        this.numeroDeMes(nuevoMes);
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

    numeroDeMes(nodoMes){
        if(nodoMes.mes == 'enero'){
            nodoMes.numeroMes = 1;
        }else if(nodoMes.mes == 'febrero'){
            nodoMes.numeroMes = 2;
        }else if(nodoMes.mes == 'marzo'){
            nodoMes.numeroMes = 3;
        }else if(nodoMes.mes == 'abril'){
            nodoMes.numeroMes = 4;
        }else if(nodoMes.mes == 'mayo'){
            nodoMes.numeroMes = 5;
        }else if(nodoMes.mes == 'junio'){
            nodoMes.numeroMes = 6;
        }else if(nodoMes.mes == 'julio'){
            nodoMes.numeroMes = 7;
        }else if(nodoMes.mes == 'agosto'){
            nodoMes.numeroMes = 8;
        }else if(nodoMes.mes == 'septiembre'){
            nodoMes.numeroMes = 9;
        }else if(nodoMes.mes == 'octubre'){
            nodoMes.numeroMes = 10;
        }else if(nodoMes.mes == 'noviembre'){
            nodoMes.numeroMes = 11;
        }else if(nodoMes.mes == 'diciembre'){
            nodoMes.numeroMes = 12;
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
}

let meses = new ListaMeses()
meses.insertarMes('diciembre');
meses.insertarMes('febrero');

meses.MostrarMeses();
