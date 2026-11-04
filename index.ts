const ENDPOINT = "https://6aea21a23d3dd3d37be62a65.mockapi.io/api/v1/users";
console.log("INDEX.TS CARGADO");
// Estructura de los usuarios
interface User {
    id: string;
    name: string;
    avatar: string;
}

// Obtenemos el contenedor HTML
const contenedor = document.getElementById("lista-usuarios");

//array para almacenar los usuarios y para filtrar despues
let usuarios: User[] = [];

const buscador = document.getElementById("buscador") as HTMLInputElement; //El htmlinput para especificar que es un input de texto y poder usar .value
const botonBuscar = document.getElementById("btn-buscar");
console.log(buscador);
console.log(botonBuscar);

// Función para consultar la API
const getUsers = async () => {

    try {

        console.log("Consultando API...");

        const response = await fetch(ENDPOINT);

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const data: User[] = await response.json();

        //Se guarda el array en la variable global papu
        usuarios = data;

        console.log("Usuarios recibidos:", data);

        renderUsers(data);

    } catch (error) {

        console.error("Error:", error);

    }
};

function filterUsers() {
    const busqueda = buscador.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter((user) => {
        return user.name.toLowerCase().startsWith(busqueda);    });

    renderUsers(usuariosFiltrados);
}

botonBuscar?.addEventListener("click", () => {
    filterUsers();
});

// Función para mostrar los usuarios
function renderUsers(users: User[]) {

    console.log("Entrando a renderUsers");
//sixseven
    if (!contenedor) {
        console.error("No se encontró el contenedor HTML");
        return;
    }

    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    // Recorremos los usuarios
    users.forEach((user) => {

        // Creamos los elementos HTML
        const tarjeta = document.createElement("article");
        const titulo = document.createElement("h2");
        const imagen = document.createElement("img");

        // Asignamos los datos
        titulo.textContent = user.name;
        imagen.src = user.avatar;
        imagen.alt = "Imagen de " + user.name;

        // Agregamos los elementos a la tarjeta
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);

        // Agregamos la tarjeta al contenedor
        contenedor.appendChild(tarjeta);

    });

    console.log("Usuarios mostrados correctamente");
}

// Ejecutamos la consulta
getUsers();