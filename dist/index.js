"use strict";
const ENDPOINT = "https://6aea21a23d3dd3d37be62a65.mockapi.io/api/v1/users";
// Obtenemos el contenedor HTML
const contenedor = document.getElementById("lista-usuarios");
// Función para consultar la API
const getUsers = async () => {
    try {
        console.log("Consultando API...");
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        console.log("Usuarios recibidos:", data);
        renderUsers(data);
    }
    catch (error) {
        console.error("Error:", error);
    }
};
// Función para mostrar los usuarios
function renderUsers(users) {
    console.log("Entrando a renderUsers");
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
