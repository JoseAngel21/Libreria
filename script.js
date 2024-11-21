// script.js

// Referencias a los elementos del DOM
const form = document.getElementById('crud-form');
const tableBody = document.getElementById('data-table');

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', loadData);

// Manejar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const fecha = document.getElementById('fecha').value;
    const correo = document.getElementById('correo').value;
    const nombre = document.getElementById('nombre').value;
    const asunto = document.getElementById('asunto').value;
    const comentario = document.getElementById('comentario').value;

    if (id) {
        // Editar un registro existente
        updateData(id, { fecha, correo, nombre, asunto, comentario });
    } else {
        // Agregar un nuevo registro
        addData({ fecha, correo, nombre, asunto, comentario });
    }

    form.reset();
    document.getElementById('id').value = '';
});

// Agregar datos
function addData(data) {
    const existingData = getData();
    const newId = existingData.length ? existingData[existingData.length - 1].id + 1 : 1;
    existingData.push({ id: newId, ...data });
    saveData(existingData);
    renderTable();
}

// Editar datos
function updateData(id, updatedData) {
    const existingData = getData();
    const index = existingData.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
        existingData[index] = { id: parseInt(id), ...updatedData };
        saveData(existingData);
        renderTable();
    }
}

// Eliminar datos
function deleteData(id) {
    const existingData = getData();
    const updatedData = existingData.filter((item) => item.id !== id);
    saveData(updatedData);
    renderTable();
}

// Obtener datos de localStorage
function getData() {
    return JSON.parse(localStorage.getItem('crudData')) || [];
}

// Guardar datos en localStorage
function saveData(data) {
    localStorage.setItem('crudData', JSON.stringify(data));
}

// Cargar datos iniciales
function loadData() {
    renderTable();
}

// Renderizar la tabla
function renderTable() {
    const data = getData();
    tableBody.innerHTML = '';
    data.forEach(({ id, fecha, correo, nombre, asunto, comentario }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${fecha}</td>
            <td>${correo}</td>
            <td>${nombre}</td>
            <td>${asunto}</td>
            <td>${comentario}</td>
            <td class="actions">
                <button onclick="editData(${id})">Editar</button>
                <button onclick="deleteData(${id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Editar un registro
function editData(id) {
    const data = getData();
    const item = data.find((item) => item.id === id);
    if (item) {
        document.getElementById('id').value = item.id;
        document.getElementById('fecha').value = item.fecha;
        document.getElementById('correo').value = item.correo;
        document.getElementById('nombre').value = item.nombre;
        document.getElementById('asunto').value = item.asunto;
        document.getElementById('comentario').value = item.comentario;
    }
}
