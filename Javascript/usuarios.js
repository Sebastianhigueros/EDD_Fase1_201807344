class NodoUsuario{
    constructor(id,nombre,edad,correo,password){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.clientes = new ListaCliente();
        this.calendario = new ListaMeses();
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class ArbolUsuarios{
    constructor(){
        this.raiz = null;
    }
    
    insertarRaiz(id,nombre,edad,correo,password){
        let nuevoUsuario = new NodoUsuario(id,nombre,edad,correo,password);

        if(this.raiz == null){
            this.raiz = nuevoUsuario;
        }else{
            this.raiz = this.insertarNodo(this.raiz,nuevoUsuario);
        }
        

    }

    insertarNodo(raiz,usuario){
        if(raiz == null){
            raiz = usuario;
            return raiz;
        }else{
            if(usuario.id > raiz.id){
                raiz.derecha = this.insertarNodo(raiz.derecha,usuario);

                if(this.alturaNodo(raiz.derecha) - this.alturaNodo(raiz.izquierda) == 2){
                    if(usuario.id >raiz.derecha.id){
                        raiz = this.rotacionDerecha(raiz);
                    }else{
                        raiz = this.rotacionD_I(raiz);
                    }
                }else if(usuario.id < raiz.id){
                    raiz.izquierda = this.insertarNodo(raiz.izquierda,usuario);

                    if(this.alturaNodo(raiz.derecha) - this.alturaNodo(raiz.izquierda == -2)){
                        
                        if(usuario.id < raiz.izquierda.id){
                            raiz = this.rotacionIzquierda(raiz);
                        }else{
                            raiz = this.rotacionI_D(raiz);
                        }
                    }
                }
            }
        }

        raiz.altura = this.alturaMax(this.alturaNodo(raiz.izquierda),this.alturaNodo(raiz.derecha)) + 1;
        return raiz
    }

    rotacionDerecha(usuario){
        let temp = usuario.derecha;
        usuario.derecha = temp.izquierda
        temp.izquierda = usuario;
        usuario = temp;
        this.recalcularAltura(temp,usuario);
        return usuario;

    }

    rotacionIzquierda(usuario){
        let temp = usuario.izquierda;
        usuario.izquierda = temp.derecha;
        temp.derecha = usuario;
        usuario = temp;
        this.recalcularAltura(temp,usuario);
        return usuario;
    }

    rotacionD_I(usuario){
        usuario.derecha = this.rotacionIzquierda(usuario.derecha);
        let temp = this.rotacionDerecha(usuario);
        return temp;
    }

    rotacionI_D(usuario){
        usuario.izquierda = this.rotacionDerecha(usuario.izquierda);
        let temp = this.rotacionIzquierda(usuario);
        return temp;
    }

    recalcularAltura(temp,usuario){
        temp.altura = this.alturaMax(this.alturaNodo(temp.izquierda),this.alturaNodo(temp.derecha))+1;
        usuario.altura = this.alturaMax(this.alturaNodo(usuario.izquierda),this.alturaNodo(usuario.derecha))+1;
    }

    alturaNodo(usuario){
        if(usuario == null){
            return -1;
        }else{
            return usuario.altura;
        }
    }

    alturaMax(altura1,altura2){
        if(altura1 > altura2){
            return altura1;
        }else{
            return altura2;
        }
    }

    graficarArbol(){
        let texto = "digraph usuarios{\n";

        texto += "\n"+this.graficarNodos(this.usuario);
        texto += "\n"+this.graficarEnlaces(this.usuario);

        texto += "}";

        return texto

    }

    graficarNodos(usuario){
        let texto = "";
        if(usuario != null){
            
            texto += "node[label="+'"'+"nombre: "+usuario.nombre+" correo: "+usuario.correo+'"]'+usuario.id+'\n';
            texto += this.graficarNodos(usuario.izquierda);
            texto += this.graficarNodos(usuario.derecha);
        }
        return texto
    }

    graficarEnlaces(usuario){
        let texto = "";
        if(usuario != null){
        

            if(usuario.derecha != null){
                texto += usuario.id+"->"+usuario.derecha.id+'\n';
            }

            if(proveedorActual.izquierda != null){
                texto += usuario.id+"->"+usuario.izquierda.id+'\n';
            }

            texto += this.graficarEnlaces(usuario.izquierda);
            texto += this.graficarEnlaces(usuario.derecha);

        }
        return texto
    }
}




