class Blockchain{
    constructor(indice,data,Hashprevio){
        this.indice = indice;
        this.data = data;
        this.fecha = Date.now();
        this.Hashprevio = Hashprevio;
        this.hash = this.Hash();
        this.nonce = 0;

        this.prueba(4);
    }

    Hash(){
        return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(this.indice+this.data+this.fecha+this.Hashprevio+this.nonce));
    }

    prueba(tamano){
        while(this.hash.substring(0,tamano) != Array(tamano+1).join("0")){
            this.nonce += 1;
            this.hash = this.Hash();
        }
        return this.hash;
    }


}

class cadena{
    constructor(){
        this.indice = 0;
        this.cadena = [];
        this.cadena.push(this.bloqueinicio());
    }

    bloqueinicio(){
        let inicio = new Blockchain(this.indice,"bloque genesis","");
        this.indice +=1;
        return inicio;
    }

    agregarBloque(informacion){
        let nuevoBloque = new Blockchain(this.indice,informacion,this.cadena[this.indice-1].hash);
        this.indice +=1;
        this.cadena.push(nuevoBloque);
    }

    graficar(){
        let texto = "digraph encriptados{\n";
        texto += "\trankr=TB;\n";
        texto += "\tnode[shape= box]\n";
        for(let i of this.cadena){
            texto += "\tnode[label=\"fecha:"+i.fecha+"\n\thash:"+i.hash+"\n\thashPrevio:"+i.Hashprevio+"\n\tnonce:"+i.nonce+"\"]d"+i.indice+";\n"
        }

        for(var i = 0; i < this.cadena.length-1;i++){
            texto += "\td"+this.cadena[i].indice+" ->d"+this.cadena[i+=1].indice+"\n";
        }

        texto +="}";

        return texto;
    }
}

