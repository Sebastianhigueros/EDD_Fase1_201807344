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
            raiz.altura = this.alturaMax(this.alturaNodo(raiz.izquierda),this.alturaNodo(raiz.derecha)) + 1;
            return raiz
        }
    }



    rotacionDerecha(usuario){
        let temp = usuario.derecha;
        usuario.derecha = temp.izquierda
        temp.izquierda = usuario;
        this.recalcularAlturaDerecha(temp,usuario);
        return temp;

    }

    rotacionIzquierda(usuario){
        let temp = usuario.izquierda;
        usuario.izquierda = temp.derecha;
        temp.derecha = usuario;
        this.recalcularAlturaIzquierda(temp,usuario);
        return temp;
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

    recalcularAlturaDerecha(temp,usuario){
        temp.altura = this.alturaMax(usuario.altura.altura,this.alturaNodo(temp.derecha))+1;
        usuario.altura = this.alturaMax(this.alturaNodo(usuario.izquierda),this.alturaNodo(usuario.derecha))+1;
    }

    recalcularAlturaIzquierda(temp,usuario){
        temp.altura = this.alturaMax(usuario.altura.altura,this.altura(usuario.izquierda))+1;
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

    buscarPrimerusuario(nombre,contrasena){
        if(this.raiz != null){
            if(this.raiz.nombre == nombre && this.raiz.password == contrasena){
                return this.raiz;
            }else{
                return this.buscarUsuario(this.raiz,nombre,contrasena);
            }
        }else{
            return null;
        }
    }

    buscarUsuario(raizActual,nombre,contrasena){
            if(raizActual != null){
                if(raizActual.nombre == nombre && raizActual.password == contrasena){
                    return raizActual;
                }

                let izquierda = this.buscarUsuario(raizActual.izquierda,nombre,contrasena);
                let derecha = this.buscarUsuario(raizActual.derecha,nombre,contrasena);
                if(izquierda == null){
                    return derecha
                }else if(derecha == null){
                    return izquierda
                }else{
                    return null;
                }
            }
        
    }

    buscarPrimerusuarioNombre(nombre){
        if(this.raiz != null){
            if(this.raiz.nombre == nombre){
                return this.raiz;
            }else{
                return this.buscarUsuario(this.raiz,nombre);
            }
        }else{
            return null;
        }
    }

    buscarUsuarioNombre(raizActual,nombre){
            if(raizActual != null){
                if(raizActual.nombre == nombre){
                    return raizActual;
                }

                let izquierda = this.buscarUsuario(raizActual.izquierda,nombre);
                let derecha = this.buscarUsuario(raizActual.derecha,nombre);
                if(izquierda == null){
                    return derecha
                }else if(derecha == null){
                    return izquierda
                }else{
                    return null;
                }
            }
        
    }


    obtenerPrimerusuarioID(id){
        if(this.raiz.id == id){
            return this.raiz;
        }else{
            return this.obtenerusuarioID(this.raiz,id);
        }
    }

    obtenerusuarioID(usuarioActual,id){
        if(usuarioActual.id == id){
            return usuarioActual;
        }else{
            let temp = usuarioActual;
            if(temp.id > id){
                return this.obtenerusuarioID(temp.izquierda,id);
            }else if(temp.id < id){
                return this.obtenerusuarioID(temp.derecha,id);
            }else{
                alert('Error: el usuario no exite');
            }
        }
    }

    cargarCliente(id,Idcliente,nombreCliente,correocliente){
        let usuario = this.obtenerPrimerusuario(id);
        if(usuario != null){
            usuario.clientes.agregarCliente(Idcliente,nombreCliente,correocliente);
            alert("cliente cargado con exito")
        }else{
            alert("El usuario no existe");
        }

    }

    cargarEvento(id,mes,dia,hora,evento){
        let usuario = this.obtenerPrimerusuario(id);
        if(usuario != null){
            let mesBuscado =usuario.calendario.buscarMes(mes);
            if(mesBuscado != null){
                mesBuscado.calendario.agregarEvento(evento,dia,hora);
            }else{
                usuario.calendario.insertarMes(mes);
                mesBuscado =usuario.calendario.buscarMes(mes);
                mesBuscado.calendario.agregarEvento(evento,dia,hora);
            }
        }
    }

    graficarArbol(){
        let texto = "digraph usuarios{\n";

        texto += "\n"+this.graficarNodos(this.raiz);
        texto += "\n"+this.graficarEnlaces(this.raiz);

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

            if(usuario.izquierda != null){
                texto += usuario.id+"->"+usuario.izquierda.id+'\n';
            }

            texto += this.graficarEnlaces(usuario.izquierda);
            texto += this.graficarEnlaces(usuario.derecha);

        }
        return texto
    }

}




function crearMemoria(){   
    let inventario = new ArbolInventario();
    let Usuarios = new ArbolUsuarios();
    let proveedores = new ArbolProveedores();
    let provtemp = JSON.stringify(CircularJSON.stringify(proveedores));
    localStorage.setItem('proveedores',provtemp);
    let arboltemp = CircularJSON.stringify(Usuarios);

    let listaUsuarios = JSON.stringify(arboltemp);

    localStorage.setItem("usuarios",listaUsuarios);

    let inventariotemp = JSON.stringify(CircularJSON.stringify(inventario));
    localStorage.setItem("inventario",inventariotemp);
}

function inicioSesion(){
    document.cookie

    var usu = document.getElementById("usuario").value;
    var pas = document.getElementById("pass").value;


    if(usu === "admin" && pas == 1234){
        sessionStorage.setItem('usuario','admin');
        let Usuarios = new ArbolUsuarios();
        let proveedores = new ArbolProveedores();
        let rutas = new grafoRutas();
        let inventario = new ArbolInventario()
        let ventas = new TablaVentas();
        let ventasencript = new cadena();
        var provtemp = CircularJSON.stringify(proveedores);
        var provtemp2 = JSON.stringify(provtemp);
        localStorage.setItem('proveedores',provtemp2);
        var arboltemp = CircularJSON.stringify(Usuarios);
    
        var listaUsuarios = JSON.stringify(arboltemp);
    
        localStorage.setItem("usuarios",listaUsuarios);

        
        var rutatemp = CircularJSON.stringify(rutas);
        var rutatemp2 = JSON.stringify(rutatemp)
        localStorage.setItem("rutas",rutatemp2)
    
        var inventariotemp = CircularJSON.stringify(inventario);
        var inventariotemp2 = JSON.stringify(inventariotemp);
        localStorage.setItem("inventario",inventariotemp2);

        var ventastemp = CircularJSON.stringify(ventas);
        var ventastemp2 = JSON.stringify(ventastemp);
        localStorage.setItem("ventas",ventastemp2);

        var encript = CircularJSON.stringify(ventasencript);
        var encript2 = JSON.stringify(encript);

        localStorage.setItem("ventasEncript",encript2);

        

        window.location.href ="administrador.html";




    }else{
        let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));
        let tempus = new ArbolUsuarios();
        Object.assign(tempus,usuarios);
        let usuario = tempus.buscarPrimerusuario(usu,pas);
        if(usuario != null){
            sessionStorage.setItem('usuario',usuario.id);
            sessionStorage.setItem('username',usuario.nombre);


            let listaTemp = usuario.clientes;
            listaTemp = CircularJSON.stringify(listaTemp);
            let ListaClientes = JSON.stringify(listaTemp);
            sessionStorage.setItem('clientes',ListaClientes);
        
            let listaMeses = usuario.calendario;
            listaMeses = JSON.stringify(CircularJSON.stringify(listaMeses));
            sessionStorage.setItem("calendario",listaMeses);

            window.location.href = "vendedor.html";
        }else{
            alert("el usuario no existe");
        }
    }
}

function obtenerUsuarios(){

    let temp = JSON.parse(localStorage.getItem('usuarios'));
    let listausuarios = new ArbolUsuarios();
    temp = CircularJSON.parse(temp);
    Object.assign(listausuarios,temp);

    let provetemp = JSON.parse(CircularJSON.parse(localStorage.getItem('proveedores')));

    let proveedores = new ArbolProveedores();
    Object.assign(proveedores,provetemp);

    let inventtemp = JSON.parse(CircularJSON.parse(localStorage.getItem('inventario')));
    let inventario = new ArbolInventario();
    Object.assign(inventario,inventtemp);



}


function creaEvento(){
    let meses = JSON.parse(sessionStorage.getItem('calendario'));
    meses = CircularJSON.parse(meses);
    let listameses = new ListaMeses();
    Object.assign(listameses,meses);
    var mes = document.getElementById('mes').value;
    var dia = document.getElementById('dia').value;
    var hora = document.getElementById('hora').value;
    var evento = document.getElementById('evento').value;

    let mesbuscado = listameses.buscarMes(mes);
    if(mesbuscado != null){
        let eventos = mesbuscado.calendario;
        let calendario = new Calendario();
        Object.assign(calendario,eventos);
        calendario.agregarEvento(evento,dia,hora)
        mesbuscado.calendario = calendario;
        alert("evento creado")
    }else{
        listameses.insertarMes(mes);
        let mesbuscado = listameses.buscarMes(mes);
        let eventos = mesbuscado.calendario;
        let calendario = new Calendario();
        Object.assign(calendario,eventos);
        calendario.agregarEvento(evento,dia,hora);
        mesbuscado.calendario = calendario;
        alert("evento creado");
    }

    document.getElementById('mes').value = '';
    document.getElementById('dia').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('evento').value = '';

    sessionStorage.setItem("calendario",JSON.stringify(CircularJSON.stringify(listameses)))
}


function CrearCliente(){
    let clientes = JSON.parse(sessionStorage.getItem("clientes"));
    clientes = CircularJSON.parse(clientes);
    let listaClientes = new ListaCliente();
    Object.assign(listaClientes,clientes);
    var id = document.getElementById("idCliente").value;
    var nombre = document.getElementById("nombreCliente").value;
    var correo = document.getElementById("correoCliente").value;

    let nuevoCliente =listaClientes.agregarCliente(id,nombre,correo)

    if(nuevoCliente != null){
        alert("cliente creado exitosamente");
    }else{
        alert("Ocurrio un error");
    }

    document.getElementById("idCliente").value = '';
    document.getElementById("nombreCliente").value = '';
    document.getElementById("correoCliente").value = '';

    sessionStorage.setItem("clientes",JSON.stringify(CircularJSON.stringify(listaClientes)));

}

function ModificarCliente(){
    let clientes = JSON.parse(sessionStorage.getItem('clientes'));
    clientes = CircularJSON.parse(clientes);
    let listaClientes = new ListaCliente();
    Object.assign(listaClientes,clientes);
    var id = document.getElementById("idCliente").value;
    var nombre = document.getElementById("nombreCliente").value;
    var correo = document.getElementById("correoCliente").value;

    listaClientes.ModificarCliente(id,nombre,correo)

    document.getElementById("idCliente").value = '';
    document.getElementById("nombreCliente").value = '';
    document.getElementById("correoCliente").value = '';


    sessionStorage.setItem("clientes",JSON.stringify(CircularJSON.stringify(listaClientes)))
}

function EliminarCliente(){
    let clientes = JSON.parse(sessionStorage.getItem('clientes'));
    clientes = CircularJSON.parse(clientes);
    let listaClientes = new ListaCliente();
    Object.assign(listaClientes,clientes);

    let id = document.getElementById("idCliente").value;

    let eliminado = listaClientes.EliminarCliente(id);

    if(eliminado){
        alert("El cliente ha sido eliminado");  
    }else{
        alert("ocurrio un error");
    }

    document.getElementById("idCliente").value = '';
    document.getElementById("nombreCliente").value = '';
    document.getElementById("correoCliente").value = '';

    sessionStorage.setItem("clientes",JSON.stringify(CircularJSON.stringify(listaClientes)))
}

function obtenerDatos(){
    let tempC = JSON.parse(sessionStorage.getItem('clientes'));
    let listaClientes= new ListaCliente();
    tempC = CircularJSON.parse(tempC);
    Object.assign(listaClientes,tempC);

    let tempCa = JSON.parse(sessionStorage.getItem('calendario'));
    let calen = new ListaMeses();
    tempCa = CircularJSON.parse(tempCa);
    Object.assign(calen,tempCa);

}

function CrearUsuarios(){
    try{
        let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem("usuarios")));

        let nuevoUsuario = new ArbolUsuarios();
        Object.assign(nuevoUsuario,usuarios);

        let id = document.getElementById('idusuario').value;
        let nombre = document.getElementById('nombreusuario').value;
        let edad = document.getElementById('edadusuario').value;
        let correo = document.getElementById('correousuario').value;
        let pass = document.getElementById('passusuario').value;

        nuevoUsuario.insertarRaiz(id,nombre,edad,correo,pass);

        localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(nuevoUsuario)));
    }catch{
        alert("ocurrio un error");
    }
}

function CrearItemInventario(){
    try{
        var inventario = JSON.parse(CircularJSON.parse(localStorage.getItem("inventario")));
        var nuevoInventario = new ArbolInventario();
        Object.assign(nuevoInventario,inventario);
        console.log(nuevoInventario);
        let id = document.getElementById("idprod").value;
        let nombre = document.getElementById("nombreprod").value;
        let precio = document.getElementById("precioprod").value;
        let cantidad = document.getElementById("cantidadprod").value;
        let raizprueba = new NodoArbol()
        Object.assign(raizprueba,nuevoInventario.raiz);

        nuevoInventario.raiz = raizprueba;
        console.log(nuevoInventario.raiz);
        nuevoInventario.agregarItem(id,nombre,precio,cantidad);

        var temp = CircularJSON.stringify(nuevoInventario);
        var temp2 = JSON.stringify(temp);
        console.log(nuevoInventario.raiz);
        console.log(temp2);
        localStorage.setItem("inventario",JSON.stringify(CircularJSON.stringify(nuevoInventario)));
        alert("Producto agregado")
    }catch (error){
        alert("Ocurrio un error: "+error);
    }
}

function CrearProveedores(){
    let proveedores = JSON.parse(CircularJSON.parse(localStorage.getItem('proveedores')));

    let nuevosproveedores = new ArbolProveedores();
    Object.assign(nuevosproveedores,proveedores);

    let id = document.getElementById('idprov').value;
    let nombre = document.getElementById('nombreprov').value;
    let direccion = document.getElementById('dirprov').value;
    let correo = document.getElementById('correoprov').value;
    let telefono = document.getElementById('telprov').value;

    let nuevoProveedor = nuevosproveedores.agregarPrimerProveedor(id,nombre,direccion,telefono,correo);

    if(nuevoProveedor != null){
        alert("Proveedor creado exitosamente");
    }else{
        alert("ocurrio un error");
    }
    localStorage.setItem('proveedores',JSON.stringify(CircularJSON.stringify(nuevosproveedores)));
}

function GraficarCliente(){
    let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));
    let listaUsuario = new ArbolUsuarios();
    Object.assign(listaUsuario,usuarios);

    var id = document.getElementById('idusuario').value;

    let usuario = listaUsuario.obtenerPrimerusuarioID(id);

    if(usuario != null){
        let clientes = usuario.clientes;
        let listausuario = new ListaCliente();
        Object.assign(listausuario,clientes)

        let textoDot = listausuario.Graficar();
        document.getElementById("dot").value = textoDot;
        let parseado = vis.parseDOTNetwork(textoDot);

        var container = document.getElementById("graficas");
        var data = {
            nodes: parseado.nodes,
            edges: parseado.edges
        }
        var options ={};

        var network = new vis.Network(container,data,options);

    }
}

function GraficarCalendario(){
    let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));
    let listaUsuario = new ArbolUsuarios();
    Object.assign(listaUsuario,usuarios);

    var id = document.getElementById("idusuario").value;
    var mes = document.getElementById("mes").value;

    let usu = listaUsuario.obtenerPrimerusuarioID(id);
    let meses = usu.calendario;
    let listameses = new ListaMeses();
    Object.assign(listameses,meses);
    

    if(usu != null){
        let buscado = listameses.buscarMes(mes);
        if(buscado != null){
            let eventos = buscado.calendario;
            let calendario = new Calendario()
            Object.assign(calendario,eventos);
            let textoDot = calendario.graficarCalendario();
            document.getElementById("dot").value = textoDot;
            let parseado = vis.parseDOTNetwork(textoDot)

            var container = document.getElementById("graficas");
            var data = {
                nodes: parseado.nodes,
                edges: parseado.edges
            }
            var options ={};

            var network = new vis.Network(container,data,options);
        }

    }

}

function GraficarUsuarios(){
    let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));
    let listaUsuario = new ArbolUsuarios();
    Object.assign(listaUsuario,usuarios);

    var textoDot = listaUsuario.graficarArbol();
    document.getElementById("dot").value = textoDot;
    var datosparseados = vis.parseDOTNetwork(textoDot);

    var container = document.getElementById("graficas");
    var data = {
        nodes: datosparseados.nodes,
        edges: datosparseados.edges
    }
    var options ={};

    var network = new vis.Network(container,data,options);


}

function GraficarProveedores(){
    let listaProv = JSON.parse(CircularJSON.parse(localStorage.getItem('proveedores')));

    let listaProveedores = new ArbolProveedores();

    Object.assign(listaProveedores,listaProv);

    var textoDot = listaProveedores.graficarArbol();
    document.getElementById("dot").value = textoDot;
    var datosparseados = vis.parseDOTNetwork(textoDot);

    var container = document.getElementById("graficas");
    var data = {
        nodes: datosparseados.nodes,
        edges: datosparseados.edges
    }
    var options ={};

    var network = new vis.Network(container,data,options);


}

function graficaCalendario(){
    let meses = JSON.parse(sessionStorage.getItem('calendario'));
    meses = CircularJSON.parse(meses);
    let listameses = new ListaMeses();
    Object.assign(listameses,meses);
    var mes = document.getElementById('mes').value;

    let buscarmes = listameses.buscarMes(mes);

    if(buscarmes != null){
        let eventos = buscarmes.calendario;
        let listaeventos = new Calendario();
        Object.assign(listaeventos,eventos);
        let textoDot = listaeventos.graficarCalendario();
        document.getElementById("dot").value = textoDot;
        let datosparseados = vis.parseDOTNetwork(textoDot);

        var container = document.getElementById("graficas");
        var data = {
            nodes: datosparseados.nodes,
            edges: datosparseados.edges
        }
        var options ={};
    
        var network = new vis.Network(container,data,options);
    }

}

async function cargarclientes(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let clientes = JSON.parse(texto);
        let tamano = Object.keys(clientes.vendedores).length;

        let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));

        let listaus = new ArbolUsuarios();

        Object.assign(listaus,usuarios);

        for(var i = 0;i < tamano;i++){
            let idus = clientes.vendedores[i].id;
            let usuario = listaus.obtenerPrimerusuarioID(idus);
            let listaclientes = usuario.clientes;
            let tempclientes = new ListaCliente();
            Object.assign(tempclientes,listaclientes);
            let listaagregar = clientes.vendedores[i].clientes;
            let tamagregar = Object.keys(listaagregar).length;
            for(var j = 0; j < tamagregar;j++){
                tempclientes.agregarCliente(listaagregar[j].id,listaagregar[j].nombre,listaagregar[j].correo);
            }

            usuario.clientes = tempclientes;

        }

        localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(listaus)));
        alert("clientes agregados");
    }catch{
        alert("ocurrio un error");
    }

}

async function cargarEventos(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let eventos = JSON.parse(texto);
        let tamano = Object.keys(eventos.vendedores).length;

        let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));

        let listaus = new ArbolUsuarios();

        Object.assign(listaus,usuarios);

        for(var i = 0;i < tamano;i++){
            let idus = eventos.vendedores[i].id;
            let usuario = listaus.obtenerPrimerusuarioID(idus);
            let calendario = usuario.calendario;
            let tempCal = new ListaMeses();
            Object.assign(tempCal,calendario);
            let listaagregar = eventos.vendedores[i].eventos;
            let tamagregar = Object.keys(listaagregar).length;
            for(var j = 0;j < tamagregar;j++){
                let mes = listaagregar[j].mes;
                let nombremes = '';
                if(mes == 1){
                    nombremes = 'enero'
                }else if(mes ==2){
                    nombremes = 'febrero'
                }else if(mes ==3){
                    nombremes = 'marzo'
                }else if(mes ==4){
                    nombremes = 'abril'
                }else if(mes ==5){
                    nombremes = 'mayo'
                }else if(mes ==6){
                    nombremes = 'junio'
                }else if(mes ==7){
                    nombremes = 'julio'
                }else if(mes ==8){
                    nombremes = 'agosto'
                }else if(mes ==9){
                    nombremes = 'septiembre'
                }else if(mes ==10){
                    nombremes = 'octubre'
                }else if(mes ==11){
                    nombremes = 'noviembre'
                }else if(mes ==12){
                    nombremes = 'diciembre'
                }
                let mesbuscado = tempCal.buscarMes(nombremes);
                if(mesbuscado != null){
                    let listaeventos = mesbuscado.calendario;
                    let tempev = new Calendario();
                    Object.assign(tempev,listaeventos);

                    tempev.agregarEvento(listaagregar[j].desc,listaagregar[j].dia,listaagregar[i].hora);
                    mesbuscado.calendario = tempev;
                }else{
                    tempCal.insertarMes(nombremes);
                    mesbuscado = tempCal.buscarMes(nombremes);
                    let listaeventos = mesbuscado.calendario;
                    let tempev = new Calendario();
                    Object.assign(tempev,listaeventos);
                    tempev.agregarEvento(listaagregar[j].desc,listaagregar[j].dia,listaagregar[i].hora);
                    mesbuscado.calendario = tempev;
                }
                usuario.calendario = tempCal; 
            }
        }

        localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(listaus)));
        alert("eventos cargados")
    }catch{
        alert("ocurrio un error")
    }
}

async function cargarProveedores(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let prov = JSON.parse(texto);
        let tamano = Object.keys(prov.proveedores).length;

        let proveedores = JSON.parse(CircularJSON.parse(localStorage.getItem('proveedores')));

        let listaProv = new ArbolProveedores();

        Object.assign(listaProv,proveedores);

        for(var i = 0;i < tamano;i++){
            listaProv.agregarPrimerProveedor(prov.proveedores[i].id,prov.proveedores[i].nombre,prov.proveedores[i].direccion,prov.proveedores[i].telefono,prov.proveedores[i].correo);
        }

        localStorage.setItem('proveedores',JSON.stringify(CircularJSON.stringify(listaProv)));
        alert("Proveedores agregados");
    }catch{
        alert("Ocurrio un error")
    }

}

async function cargarUsuarios(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let usu = JSON.parse(texto);
        let tamano = Object.keys(usu.vendedores).length;

        let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem('usuarios')));

        let listausuarios = new ArbolUsuarios();
        Object.assign(listausuarios,usuarios);

        for(var i = 0;i < tamano;i++){
            let id = usu.vendedores[i].id;
            let nombre = usu.vendedores[i].nombre;
            let edad = usu.vendedores[i].edad;
            let correo = usu.vendedores[i].correo;
            let pass = usu.vendedores[i].password;

            listausuarios.insertarRaiz(id,nombre,edad,correo,pass);
        }


        localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(listausuarios)));
        alert("Vendedores agregados");
    }catch(error){
        alert("ocurrio un error: "+error);
    }
}

async function cargarInventario(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let nuevoinvent = JSON.parse(texto);
        let tamano = Object.keys(nuevoinvent.productos).length;

        var invent = JSON.parse(CircularJSON.parse(localStorage.getItem("inventario")));
        var inventtemp = new ArbolInventario();
        Object.assign(inventtemp,invent);
        console.log(inventtemp.raiz)

        for(var i= 0; i < tamano;i++){
            let id = nuevoinvent.productos[i].id;
            let nombre = nuevoinvent.productos[i].nombre;
            let precio = nuevoinvent.productos[i].precio;
            let cantidad = nuevoinvent.productos[i].cantidad;

            inventtemp.agregarItem(id,nombre,precio,cantidad);
        }

        console.log(inventtemp.raiz);

        var temporal = CircularJSON.stringify(inventtemp);
        var temporal2 = JSON.stringify(temporal);
        console.log(temporal2);
        localStorage.setItem("inventario",JSON.stringify(CircularJSON.stringify(inventtemp)));
        alert("Productos agregados");

    }catch(error){
        alert("Ocurrio un error: " +error);
    }
}



async function cargarRutas(){
    try{
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let nuevasrutas = JSON.parse(texto);
        let tamano = Object.keys(nuevasrutas.rutas).length;
        let ruta = JSON.parse(localStorage.getItem('rutas'));
        ruta = CircularJSON.parse(ruta);
        let rutatemp = new grafoRutas();
        Object.assign(rutatemp,ruta);

        for(var i = 0;i < tamano; i++){
            let id = nuevasrutas.rutas[i].id;
            let nombre = nuevasrutas.rutas[i].nombre;
            let listaad = nuevasrutas.rutas[i].adyacentes
            let tamadyacentes = Object.keys(listaad).length;
            rutatemp.agregarNodo(id,nombre);
            for(var j = 0; j < tamadyacentes;j++){
                let idad = listaad[j].id;
                let nombread = listaad[j].nombre;
                let pondad = listaad[j].distancia;
                rutatemp.agregaradyacentes(id,idad,nombread,pondad);
            }
        }
        localStorage.setItem('rutas',JSON.stringify(CircularJSON.stringify(rutatemp)));
        alert("Rutas agregadas");

    }catch(error){
        alert(error);
    }
}

async function cargarVentas(){
    try {
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let nuevasventas = JSON.parse(texto);
        let tamano = Object.keys(nuevasventas.ventas).length;

        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let ventasnuevas = new TablaVentas();
        Object.assign(ventasnuevas,ventatemp);

        let inventtemp = JSON.parse(localStorage.getItem("inventario"));
        inventtemp = CircularJSON.parse(inventtemp);
        let inventariobusqueda = new ArbolInventario();
        Object.assign(inventariobusqueda,inventtemp);

        let raizparseada = new NodoArbol();
        Object.assign(raizparseada,inventariobusqueda.raiz);

        

        for(var i = 0; i < tamano; i++){
            let idVenta = nuevasventas.ventas[i].id;
            let usuario = nuevasventas.ventas[i].vendedor;
            let cliente = nuevasventas.ventas[i].cliente;
            ventasnuevas.agregarVenta(idVenta,usuario,cliente);
            let prodtemp = ventasnuevas.tabla[idVenta].productos;
            let prodtemp2 = new ListaProductos();
            Object.assign(prodtemp2,prodtemp);
            let productos = nuevasventas.ventas[i].productos;
            let tamanoproductos =  Object.keys(productos).length;
            for(var j = 0; j < tamanoproductos;j++){
                let idprod = productos[j].id;
                let obtenido =inventariobusqueda.busqueda(raizparseada,idprod);
                let nombreprod = obtenido.nombre;
                let precioprod = obtenido.precio;
                let cantidadprod = productos[j].cantidad;
                if(obtenido.cantidad > cantidadprod){
                    obtenido.cantidad = obtenido.cantidad-cantidadprod;
                    prodtemp2.agregarProducto(idprod,nombreprod,cantidadprod,precioprod);
                }else{
                    alert("stock insuficiente para: "+nombreprod);
                }
                
                
            }
            let total = prodtemp2.calcularTotal();
            ventasnuevas.tabla[idVenta].productos = prodtemp2;
            ventasnuevas.tabla[idVenta].total = total; 
        }
        localStorage.setItem("ventas",JSON.stringify(CircularJSON.stringify(ventasnuevas)));
        localStorage.setItem("inventario",JSON.stringify(CircularJSON.stringify(inventariobusqueda)));
        alert("ventas cargadas exitosamente");
    }catch(error){
        console.log("ocurrio un error:" +error);
    }
}

async function cargarVentas2(){
    try {
        let archivo = document.getElementById('archivo').files[0];
        let texto = await archivo.text();
        let nuevasventas = JSON.parse(texto);
        let tamano = Object.keys(nuevasventas.ventas).length;

        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let ventasnuevas = new TablaVentas();
        Object.assign(ventasnuevas,ventatemp);
        

        for(var i = 0; i < tamano; i++){
            let idVenta = nuevasventas.ventas[i].id;
            let usuario = nuevasventas.ventas[i].vendedor;
            let cliente = nuevasventas.ventas[i].cliente;
            ventasnuevas.agregarVenta(idVenta,usuario,cliente);
            let prodtemp = ventasnuevas.tabla[idVenta].productos;
            let prodtemp2 = new ListaProductos();
            Object.assign(prodtemp2,prodtemp);
            let productos = nuevasventas.ventas[i].productos;
            let tamanoproductos =  Object.keys(productos).length;
            for(var j = 0; j < tamanoproductos;j++){
                let idprod = productos[j].id;
                let nombreprod = productos[j].nombre;
                let precioprod = productos[j].precio;
                let cantidadprod = productos[j].cantidad;
                prodtemp2.agregarProducto(idprod,nombreprod,cantidadprod,precioprod); 
            }
            let total = prodtemp2.calcularTotal();
            ventasnuevas.tabla[idVenta].productos = prodtemp2;
            ventasnuevas.tabla[idVenta].total = total; 
        }
        localStorage.setItem("ventas",JSON.stringify(CircularJSON.stringify(ventasnuevas)));
        alert("ventas cargadas exitosamente");
    }catch(error){
        console.log("ocurrio un error:" +error);
    }
}

function crearVenta(){
    try{
        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let ventasnuevas = new TablaVentas();
        Object.assign(ventasnuevas,ventatemp);

        let idventa = document.getElementById("idVenta").value;
        let cliente = document.getElementById("nombreCliente").value;
        let usuario = sessionStorage.getItem("username");

        ventasnuevas.agregarVenta(idventa,cliente,usuario);

        localStorage.setItem("ventas",JSON.stringify(CircularJSON.stringify(ventasnuevas)));
    }catch(error){
        console.log("ocurrio un error: "+error);
    }
}

function agregarProductos(){
    try {
        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let ventasnuevas = new TablaVentas();
        Object.assign(ventasnuevas,ventatemp);

        let idventa = document.getElementById("idVenta").value;
        let usuario = sessionStorage.getItem("username");
        let idprod = document.getElementById("idprod").value;
        let cantidad = document.getElementById("cantidadprod").value;
        for(var i = 0; i < ventasnuevas.tamano;i++){
            if(ventasnuevas.tabla[i].id == idventa && ventasnuevas.tabla[i].vendedor == usuario){
                let prods = ventasnuevas.tabla[i].productos
                let prodtemp = new ListaProductos()
                Object.assign(prodtemp,prods);
            }
        }

        let inventtemp = JSON.parse(localStorage.getItem("inventario"));
        inventtemp = CircularJSON.parse(inventtemp);
        let inventariobusqueda = new ArbolInventario();
        Object.assign(inventariobusqueda,inventtemp);

        let raizparseada = new NodoArbol();
        Object.assign(raizparseada,inventariobusqueda.raiz);
        let obtenido =inventariobusqueda.busqueda(raizparseada,idprod);
        let nombreprod = obtenido.nombre;
        let precioprod = obtenido.precio;  
        if(obtenido.cantidad > cantidad){
            obtenido.cantidad = obtenido.cantidad-cantidadprod;
            prodtemp.agregarProducto(idprod,nombreprod,cantidad,precioprod);
        }else{
            alert("stock insuficiente para: "+nombreprod);
        }      
        
        localStorage.setItem("ventas",JSON.stringify(CircularJSON.stringify(ventasnuevas)));
        localStorage.setItem("inventario",JSON.stringify(CircularJSON.stringify(inventariobusqueda)));
    } catch (error) {
        console.log("Ocurrio un error: "+error);
    }
}
function graficarVentas(){
    try {
        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let grafventas = new TablaVentas();
        Object.assign(grafventas,ventatemp);
        
        let textoDot = grafventas.graficar();
        document.getElementById("dot").value = textoDot;
        var datosparseados = vis.parseDOTNetwork(textoDot);

        var container = document.getElementById("graficas");
        var data = {
            nodes: datosparseados.nodes,
            edges: datosparseados.edges
        }
        var options ={};

        var network = new vis.Network(container,data,options);

    } catch (error) {
        alert("Ocurrio un error:" + error);
    }
}



function graficarRutas(){
    let ruta = JSON.parse(localStorage.getItem('rutas'));
    ruta = CircularJSON.parse(ruta);
    let rutatemp = new grafoRutas();
    Object.assign(rutatemp,ruta);

    let textoDot = rutatemp.graficarGrafo();

    document.getElementById("dot").value = textoDot;
    var datosparseados = vis.parseDOTNetwork(textoDot);

    var container = document.getElementById("graficas");
    var data = {
        nodes: datosparseados.nodes,
        edges: datosparseados.edges
    }
    var options ={};

    var network = new vis.Network(container,data,options);

}



function graficarInventario(){
    let textoDot = ""
    let inventtemp = new ArbolInventario();
    let invent = JSON.parse(localStorage.getItem("inventario"));
    invent = CircularJSON.parse(invent);
    Object.assign(inventtemp,invent);

    textoDot += "digraph ruta{\n";
    textoDot += "\trankr=TB;\n";
    textoDot += "\tnode[shape= box]\n";
    textoDot += inventtemp.graficaNodos(inventtemp.raiz);
    textoDot += inventtemp.graficaEnlace(inventtemp.raiz);
    textoDot += "}"

    document.getElementById("dot").value = textoDot;
    var datosparseados = vis.parseDOTNetwork(textoDot);

    var container = document.getElementById("graficas");
    var data = {
        nodes: datosparseados.nodes,
        edges: datosparseados.edges
    }
    var options ={};

    var network = new vis.Network(container,data,options);
}

function encriptarVentas(){
    try {
        let texto = []
        let ventatemp = JSON.parse(localStorage.getItem("ventas"));
        ventatemp = CircularJSON.parse(ventatemp);
        let encventas = new TablaVentas();
        Object.assign(encventas,ventatemp);
        for(var i = 0; i <encventas.tamano;i++){
            if(encventas.tabla[i] != null){
                texto.push({
                    "id": encventas.tabla[i].id,
                    "vendedor": encventas.tabla[i].vendedor,
                    "cliente":encventas.tabla[i].cliente,
                    "total": encventas.tabla[i].total
                })
            }
        }
        let encripttemp = JSON.parse(localStorage.getItem("ventasEncript"));
        let encripttemp2 = CircularJSON.parse(encripttemp);
        let bloqueventas = new cadena();

        Object.assign(bloqueventas,encripttemp2);
        for(let venta of texto){
            bloqueventas.agregarBloque(venta);
        }


        
        localStorage.setItem("ventasEncript",JSON.stringify(CircularJSON.stringify(bloqueventas)));
        alert("ventas Encriptadas");
    } catch (error) {
        alert(error);
    }

}

function graficarVentasEncript(){
    try{
        let encripttemp = JSON.parse(localStorage.getItem("ventasEncript"));
        let encripttemp2 = CircularJSON.parse(encripttemp);
        let bloqueventas = new cadena();
        Object.assign(bloqueventas,encripttemp2);

        let textoDot = bloqueventas.graficar();

        document.getElementById("dot").value = textoDot;
        var datosparseados = vis.parseDOTNetwork(textoDot);

        var container = document.getElementById("graficas");
        var data = {
            nodes: datosparseados.nodes,
            edges: datosparseados.edges
        };
        var options ={};

        var network = new vis.Network(container,data,options);
    }catch(error){
        alert("ocurrio un error:"+error);
    }

}

function graficarVenta(){
    try{
    let id = document.getElementById("idVenta").value;
    let usuario = sessionStorage.getItem("username");

    let ventatemp = JSON.parse(localStorage.getItem("ventas"));
    ventatemp = CircularJSON.parse(ventatemp);
    let encventas = new TablaVentas();
    Object.assign(encventas,ventatemp);

    let textoDot = encventas.graficaPorVendedor(id,usuario);

    document.getElementById("dot").value = textoDot;
    var datosparseados = vis.parseDOTNetwork(textoDot);

    var container = document.getElementById("graficas");
    var data = {
        nodes: datosparseados.nodes,
        edges: datosparseados.edges
    };
    var options ={};

    var network = new vis.Network(container,data,options);
    }catch(error){
        alert("ocurrio un error: " +error);
    }
}

function cerrarSesion(){
    sessionStorage.removeItem('usuario');

    window.location.href = "index.html";
}

