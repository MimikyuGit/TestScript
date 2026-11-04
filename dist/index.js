"use strict";
const ENDPOINT = "https://6aea21a23d3dd3d37be62a65.mockapi.io/api/v1/users";
console.log("INDEX.TS CARGADO");
// Elementos HTML
const contenedor = document.getElementById("lista-usuarios");
const buscador = document.getElementById("buscador");
// Elementos del modal
const modal = document.getElementById("modal-detalles");
const cerrarModal = document.getElementById("cerrar-modal");
const nombreDetalle = document.getElementById("detalle-nombre");
const avatarDetalle = document.getElementById("detalle-avatar");
const biografiaDetalle = document.getElementById("detalle-biografia");
const empresaDetalle = document.getElementById("detalle-empresa");
const nacimientoDetalle = document.getElementById("detalle-nacimiento");
// Array para almacenar los usuarios
let usuarios = [];
// Consultar usuarios en la API
const getUsers = async () => {
    try {
        console.log("Consultando API...");
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        usuarios = data;
        console.log("Usuarios recibidos:", data);
        renderUsers(data);
    }
    catch (error) {
        console.error("Error:", error);
    }
};
// Filtrar usuarios
function filterUsers() {
    if (!buscador)
        return;
    const busqueda = buscador.value.toLowerCase();
    const usuariosFiltrados = usuarios.filter((user) => {
        return user.name.toLowerCase().startsWith(busqueda);
    });
    renderUsers(usuariosFiltrados);
}
// Consultar los detalles de un usuario
async function getUserDetails(user) {
    try {
        console.log("Consultando detalles de:", user.name);
        const response = await fetch(`${ENDPOINT}/${user.id}/details`);
        if (!response.ok) {
            throw new Error("No se pudieron obtener los detalles");
        }
        const details = await response.json();
        if (details.length === 0) {
            throw new Error("Este usuario no tiene detalles");
        }
        const userDetails = details[0];
        console.log("Detalles recibidos:", details);
        // Mostrar la información en el modal
        if (nombreDetalle)
            nombreDetalle.textContent = user.name;
        if (avatarDetalle) {
            avatarDetalle.src = user.avatar;
            avatarDetalle.alt = `Imagen de ${user.name}`;
        }
        if (biografiaDetalle) {
            biografiaDetalle.textContent = userDetails.biography || "Sin biografía disponible";
        }
        if (empresaDetalle) {
            empresaDetalle.textContent = userDetails.company || "No especificada";
        }
        if (nacimientoDetalle) {
            if (userDetails.birthdate) {
                nacimientoDetalle.textContent =
                    new Date(userDetails.birthdate).toLocaleDateString("es-CL");
            }
            else {
                nacimientoDetalle.textContent = "No especificada";
            }
        }
        // Abrir modal
        modal?.classList.remove("oculto");
    }
    catch (error) {
        console.error("Error al consultar detalles:", error);
        alert("No se pudieron cargar los detalles de este usuario.");
    }
}
// Mostrar usuarios en pantalla
function renderUsers(users) {
    console.log("Entrando a renderUsers");
    if (!contenedor) {
        console.error("No se encontró el contenedor HTML");
        return;
    }
    // Limpiar contenedor
    contenedor.innerHTML = "";
    // Mensaje cuando no hay resultados
    if (users.length === 0) {
        const mensaje = document.createElement("h3");
        mensaje.textContent = "Nobody Here but Us Chickens!";
        contenedor.appendChild(mensaje);
        return;
    }
    // Crear tarjetas
    users.forEach((user) => {
        const tarjeta = document.createElement("article");
        const titulo = document.createElement("h2");
        const imagen = document.createElement("img");
        const botonDetalles = document.createElement("button");
        titulo.textContent = user.name;
        imagen.src = user.avatar;
        imagen.alt = "Imagen de " + user.name;
        botonDetalles.textContent = "Ver detalles del usuario";
        botonDetalles.classList.add("boton-detalles");
        // Evento para consultar los detalles
        botonDetalles.addEventListener("click", () => {
            getUserDetails(user);
        });
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(botonDetalles);
        contenedor.appendChild(tarjeta);
    });
    console.log("Usuarios mostrados correctamente");
}
// Buscador en tiempo real
buscador?.addEventListener("input", () => {
    filterUsers();
});
// Cerrar modal con el botón
cerrarModal?.addEventListener("click", () => {
    modal?.classList.add("oculto");
});
// Cerrar modal al presionar fuera de su contenido
modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("oculto");
    }
});
// Cerrar modal con Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        modal?.classList.add("oculto");
    }
});
// Ejecutar consulta inicial
getUsers();
