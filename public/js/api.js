const API_URL = '/api';

const obtenerSesion = () => JSON.parse(localStorage.getItem('sesion') || 'null');

const guardarSesion = (datos) => localStorage.setItem('sesion', JSON.stringify(datos));

const cerrarSesion = () => {
  localStorage.removeItem('sesion');
  window.location.href = '/index.html';
};

const exigirSesion = (rol) => {
  const sesion = obtenerSesion();

  if (!sesion) {
    cerrarSesion();
    return null;
  }

  if (sesion.usuario.rol !== rol) {
    window.location.href = sesion.usuario.rol === 'admin' ? '/admin.html' : '/usuario.html';
    return null;
  }

  return sesion;
};

const api = async (ruta, opciones = {}) => {
  const sesion = obtenerSesion();
  const cabeceras = { 'Content-Type': 'application/json' };

  if (sesion) {
    cabeceras.Authorization = `Bearer ${sesion.token}`;
  }

  const respuesta = await fetch(API_URL + ruta, {
    method: opciones.method || 'GET',
    headers: cabeceras,
    body: opciones.body ? JSON.stringify(opciones.body) : undefined
  });

  const datos = await respuesta.json();

  if (respuesta.status === 401 && sesion) {
    cerrarSesion();
    return null;
  }

  if (!respuesta.ok) {
    throw new Error(datos.errores ? datos.errores.join(', ') : datos.mensaje);
  }

  return datos;
};

const escapar = (texto) => String(texto ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[c]);

const mostrarMensaje = (elemento, texto, tipo = 'error') => {
  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;
};
