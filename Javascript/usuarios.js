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
            return this.raiz
        }else{
            return this.insertarNodo(this.raiz,nuevoUsuario);
            
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

let Usuarios = new ArbolUsuarios();
let proveedores = new ArbolProveedores();
Usuarios.insertarRaiz("1",'sd',20,'sd@gmail.com','s');
Usuarios.insertarRaiz('2','juan',22,'juan@gmail.com','sdf');
let usuario = Usuarios.obtenerPrimerusuarioID(1);
let cliente = usuario.clientes;
cliente.agregarCliente(0,'juan','uncorreo@gmail.com');

usuario.calendario.insertarMes('enero');

let eventomes = usuario.calendario.buscarMes('enero');
eventomes.calendario.agregarEvento('descanso',1,9);




function inicioSesion(){


    var usu = document.getElementById("usuario").value;
    var pas = document.getElementById("pass").value;

    let arboltemp = CircularJSON.stringify(Usuarios);

    let listaUsuarios = JSON.stringify(arboltemp);

    localStorage.setItem("usuarios",listaUsuarios);

    if(usu === "admin" && pas == 1234){
        sessionStorage.setItem('usuario','admin');
        let provtemp = JSON.stringify(CircularJSON.stringify(proveedores));
        localStorage.setItem('proveedores',provtemp);
        window.location.href ="administrador.html";
    }else{
        let usuario = Usuarios.buscarPrimerusuario(usu,pas);
        if(usuario != null){
            sessionStorage.setItem('usuario',usuario.id);


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
        mesbuscado.agregarEvento(evento,dia,hora);
        alert("evento creado")
    }else{
        listameses.insertarMes(mes);
        let mesbuscado = listameses.buscarMes(mes);
        mesbuscado.calendario.agregarEvento(evento,dia,hora);
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
    let usuarios = JSON.parse(CircularJSON.parse(localStorage.getItem("usuarios")));

    let nuevoUsuario = new ArbolUsuarios();
    Object.assign(nuevoUsuario,usuarios);

    let id = document.getElementById('idusuario').value;
    let nombre = document.getElementById('nombreusuario').value;
    let edad = document.getElementById('edadusuario').value;
    let correo = document.getElementById('correousuario').value;
    let pass = document.getElementById('passusuario').value;

    let nuevo = nuevoUsuario.insertarRaiz(id,nombre,edad,correo,pass);

    if(nuevo != null){
        alert("usuario creado exitosamente");
    }else{
        alert("ocurrio un error");
    }

    localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(nuevoUsuario)));
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

    }

    localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(listaus)));

}

async function cargarEventos(){
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
            let nombremes
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
            }else{
                tempCal.insertarMes(nombremes);
                mesbuscado = tempCal.buscarMes(nombremes);
                let listaeventos = mesbuscado.calendario;
                let tempev = new Calendario();
                Object.assign(tempev,listaeventos);
                tempev.agregarEvento(listaagregar[j].desc,listaagregar[j].dia,listaagregar[i].hora);
            }
            

        }
    }


    localStorage.setItem('usuarios',JSON.stringify(CircularJSON.stringify(listaus)));
}

async function cargarProveedores(){
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
}

async function cargarUsuarios(){
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
}