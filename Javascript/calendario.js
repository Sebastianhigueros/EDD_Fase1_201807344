class NodoCabecera{
    constructor(numero){
        this.numero = numero;
        this.evento = null;
        this.anterior = null;
        this.siguiente = null;
    }
}

class ListaCabeceras{
    constructor(){
        this.inicio = null;
    }

    insertarCabecera(cabecera){
        let nuevaCabecera = cabecera;

        if(this.inicio == null){
            this.inicio = nuevaCabecera;
        }else if(nuevaCabecera.numero < this.inicio.numero){
            nuevaCabecera.siguiente = this.inicio;
            this.inicio.anterior = nuevaCabecera;
            this.inicio = nuevaCabecera;
        }else{
            let temp = this.inicio;
            while(temp.siguiente != null){
                if(nuevaCabecera.numero < temp.siguiente.numero){
                    nuevaCabecera.siguiente = temp.siguiente;
                    temp.siguiente.anterior = nuevaCabecera;
                    temp.siguiente = nuevaCabecera;
                    break
                }
                temp = temp.siguiente
            }
            if(temp.siguiente == null){
                temp.siguiente = nuevaCabecera;
                nuevaCabecera.anterior = temp;
            }
        }
    }

    getCabecera(numero){
        if(this.inicio == null){
            return null;
        }else{
            let temp = this.inicio;
            while(temp != null){
                if(temp.numero == numero){
                    return temp;
                }
                temp = temp.siguiente;
            }
            return null;
        }
    }
}


class NodoEvento{
    constructor(evento,dia,hora){
        this.dia = dia;
        this.hora = hora
        this.evento = evento;
        this.arriba = null;
        this.anterior = null;
        this.siguiente = null;
        this.abajo = null;
    }
}

class Calendario{
    constructor(){
        this.dias = new ListaCabeceras();
        this.horas = new ListaCabeceras();
    }

    agregarEvento(evento,dia,hora){
        let nuevoEvento = new NodoEvento(evento,dia,hora);

        let EventoDia = this.dias.getCabecera(dia);

        if(EventoDia == null){
            EventoDia = new NodoCabecera(dia);
            EventoDia.evento = nuevoEvento;
            this.dias.insertarCabecera(EventoDia);
        }else if(nuevoEvento.hora < EventoDia.evento.hora){
            nuevoEvento.abajo = EventoDia.evento;
            EventoDia.evento.arriba = nuevoEvento;
            EventoDia.evento = nuevoEvento;
        }else{
            let temp = EventoDia.evento;


            while(temp.abajo != null){
                if(nuevoEvento.hora < temp.abajo.evento){
                    nuevoEvento.abajo = temp.abajo;
                    temp.abajo.arriba = nuevoEvento;
                    temp.abajo = nuevoEvento;
                    nuevoEvento.arriba = temp;
                    break
                }
                temp = temp.abajo;
            }

            if(temp.abajo == null){
                temp.abajo = nuevoEvento;
                nuevoEvento.arriba = temp;
            }
        }

        let EventoHora = this.horas.getCabecera(hora);

        if(EventoHora == null){
            EventoHora = new NodoCabecera(hora);
            EventoHora.evento = nuevoEvento;
            this.horas.insertarCabecera(EventoHora);
        }else if(nuevoEvento.dia < EventoHora.evento.dia){
            nuevoEvento.siguiente = EventoHora.evento;
            EventoHora.evento.anterior = nuevoEvento;
            EventoHora.evento = nuevoEvento;
        }else{
            let temp = EventoHora.evento;

            if(temp.siguiente == null){
                temp.siguiente = nuevoEvento;
                nuevoEvento.anterior = temp;
            }

            while(temp.siguiente != null){
                if(nuevoEvento.dia < temp.siguiente.dia){
                    nuevoEvento.siguiente = temp.siguiente;
                    temp.siguiente.anterior = nuevoEvento;
                    temp.siguiente = nuevoEvento;
                    nuevoEvento.anterior = temp;
                    break
                }
                temp = temp.siguiente;
            }

            if(temp.siguiente == null){
                temp.siguiente = nuevoEvento;
                nuevoEvento.anterior = temp;
            }
        }
    }


    MostrarCalendario(){
        let temp = this.dias.inicio;
        console.log("----- calendario en dias -----");
        while(temp != null){
            let even = temp.evento;
            console.log("dia: "+ even.dia);
            while(even != null){
                console.log("Hora: "+even.hora+", evento: "+even.evento);
                even = even.abajo
            }
            temp = temp.siguiente;
        }

        let enhora = this.horas.inicio;
        console.log("----- calendario en horas -----");
        while(enhora != null){
            console.log("hora: " +enhora.evento.hora);
            enhora = enhora.siguiente;
        }


    }

    graficarCalendario(){
        let texto = "digraph Calendario{\n";
        texto += "\tnode[shape = box]"+'\n';

        texto += '\tnode[label = "calendario" pos= "-1,1!"]inicio'+'\n';;
        let dias = this.dias.inicio;
        while(dias != null){
            let posiciones = dias.numero*2;
            texto += "\tnode[label=" +'"Dia: '+dias.numero+'" pos = "'+posiciones+',1!"]d'+dias.numero+'\n';
            let evento = dias.evento;

            while(evento != null){
                let posicionEventos = evento.dia*2;
                texto += "\tnode[label="+'"'+"evento: "+evento.evento+'"'+' pos="'+ posicionEventos+',-'+evento.hora+'!"]e'+evento.dia+evento.hora+'\n';;
                evento = evento.abajo;
            }

            dias = dias.siguiente;
        }

        let horas = this.horas.inicio;

        while(horas != null){
            texto += "\tnode[label=" +'"Hora: '+horas.numero+'" pos = "-1,-'+horas.numero+'!"]h'+horas.numero+'\n';
            horas = horas.siguiente;
        }

        let enlaceDia = this.dias.inicio;


        while(enlaceDia != null){
            let enlaceEvento= enlaceDia.evento
            while(enlaceEvento!= null){
                if(enlaceEvento.arriba == null){
                    texto += "\t"+"e"+enlaceEvento.dia+enlaceEvento.hora+" ->d"+enlaceDia.numero+'\n';;
                    texto += "\t"+"d"+enlaceDia.numero+" ->e"+enlaceEvento.dia+enlaceEvento.hora+'\n';;
                }
                if(enlaceEvento.anterior == null){
                    texto += "\t"+"e"+enlaceEvento.dia+enlaceEvento.hora+" ->h"+enlaceEvento.hora+'\n';;
                    texto += "\t"+"h"+enlaceEvento.hora+" ->e"+enlaceEvento.dia+enlaceEvento.hora+'\n';;
                }
                if(enlaceEvento.abajo != null){
                    texto += "\t"+"e"+enlaceEvento.dia+enlaceEvento.hora+" ->e"+enlaceEvento.abajo.dia+enlaceEvento.abajo.hora+'\n';
                    texto += "\t"+"e"+enlaceEvento.abajo.dia+enlaceEvento.abajo.hora+" ->e"+enlaceEvento.dia+enlaceEvento.hora+'\n';
                }
                if(enlaceEvento.siguiente != null){
                    texto += "\te"+enlaceEvento.dia+enlaceEvento.hora+" ->e"+enlaceEvento.siguiente.dia+enlaceEvento.siguiente.hora+'\n';;
                    texto += "\te"+enlaceEvento.siguiente.dia+enlaceEvento.siguiente.hora+" ->e"+enlaceEvento.dia+enlaceEvento.hora+'\n';;
                }
                
                enlaceEvento = enlaceEvento.abajo;
            }
            if(enlaceDia.siguiente != null){
                texto += "\td"+enlaceDia.numero+" ->d"+enlaceDia.siguiente.numero+'\n';;
                texto += "\td"+enlaceDia.siguiente.numero+" ->d"+enlaceDia.numero+'\n';;
                
            }
            enlaceDia = enlaceDia.siguiente;
        }

        let enlaceHora = this.horas.inicio;

        while(enlaceHora != null){
            if(enlaceHora.siguiente != null){
                texto += "\th"+enlaceHora.numero+" ->h"+enlaceHora.siguiente.numero+'\n';
                texto += "\th"+ enlaceHora.siguiente.numero+" ->h"+ enlaceHora.numero+'\n';
            }
            enlaceHora = enlaceHora.siguiente;     
        }

        dias = this.dias.inicio;
        if(dias != null){
            texto += "\tinicio ->"+ "d" +dias.numero+'\n';
            texto += "\td" +dias.numero + "->inicio"+'\n';;
        }

        horas = this.horas.inicio
        if(horas != null){
            texto += "\tinicio ->"+ "h" +horas.numero+'\n';;
            texto += "\th" +horas.numero+" ->inicio"+'\n';;
        }

        texto += "}"

        return texto;
    }

}
