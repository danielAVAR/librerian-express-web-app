exigirSesion('admin');

let catalogo = [];

const formLibro = document.getElementById('formLibro');
const mensajeLibro = document.getElementById('mensajeLibro');
const formPrestamo = document.getElementById('formPrestamo');
const mensajePrestamo = document.getElementById('mensajePrestamo');
const formVenta = document.getElementById('formVenta');
const mensajeVenta = document.getElementById('mensajeVenta');
const filasVenta = document.getElementById('filasVenta');
const formCliente = document.getElementById('formCliente');
const mensajeCliente = document.getElementById('mensajeCliente');

const mostrarSeccion = (id) => {
  document.querySelectorAll('.seccion').forEach((seccion) => {
    seccion.classList.toggle('activa', seccion.id === id);
  });
  document.querySelectorAll('nav button').forEach((boton) => {
    boton.classList.toggle('activo', boton.dataset.seccion === id);
  });
};

document.querySelectorAll('nav button').forEach((boton) => {
  boton.addEventListener('click', () => mostrarSeccion(boton.dataset.seccion));
});

document.getElementById('btnSalir').addEventListener('click', cerrarSesion);

const pintarLibros = (lista) => {
  document.getElementById('tablaLibros').innerHTML = lista.map((libro) => `
    <tr>
      <td>${escapar(libro.titulo)}</td>
      <td>${escapar(libro.autor)}</td>
      <td>${escapar(libro.isbn)}</td>
      <td>${escapar(libro.precio)}</td>
      <td>${escapar(libro.stock)}</td>
      <td>
        <button type="button" onclick="editarLibro(${libro.id})">Editar</button>
        <button type="button" onclick="eliminarLibro(${libro.id})">Eliminar</button>
      </td>
    </tr>`).join('');
};

const cargarCatalogo = async () => {
  catalogo = await api('/libros');
  pintarLibros(catalogo);

  document.getElementById('selectLibroPrestamo').innerHTML = catalogo
    .map((libro) => `<option value="${libro.id}">${escapar(libro.titulo)} (stock: ${escapar(libro.stock)})</option>`)
    .join('');
};

const buscarLibros = async (texto) => {
  pintarLibros(await api(`/libros?busqueda=${encodeURIComponent(texto)}`));
};

document.getElementById('buscarLibro').addEventListener('input', (evento) => {
  buscarLibros(evento.target.value);
});

const limpiarFormLibro = () => {
  formLibro.reset();
  document.getElementById('libroId').value = '';
};

document.getElementById('btnLimpiarLibro').addEventListener('click', limpiarFormLibro);

function editarLibro(id) {
  const libro = catalogo.find((item) => item.id === id);
  document.getElementById('libroId').value = libro.id;
  formLibro.titulo.value = libro.titulo;
  formLibro.autor.value = libro.autor;
  formLibro.isbn.value = libro.isbn || '';
  formLibro.editorial.value = libro.editorial || '';
  formLibro.anio.value = libro.anio || '';
  formLibro.precio.value = libro.precio;
  formLibro.stock.value = libro.stock;
  mostrarSeccion('libros');
}

async function eliminarLibro(id) {
  if (!confirm('¿Eliminar este libro?')) {
    return;
  }

  try {
    await api(`/libros/${id}`, { method: 'DELETE' });
    mostrarMensaje(mensajeLibro, 'Libro eliminado', 'exito');
    await cargarCatalogo();
  } catch (error) {
    mostrarMensaje(mensajeLibro, error.message);
  }
}

formLibro.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const id = document.getElementById('libroId').value;
  const datos = {
    titulo: formLibro.titulo.value,
    autor: formLibro.autor.value,
    isbn: formLibro.isbn.value || null,
    editorial: formLibro.editorial.value || null,
    anio: formLibro.anio.value || null,
    precio: formLibro.precio.value,
    stock: formLibro.stock.value
  };

  try {
    await api(id ? `/libros/${id}` : '/libros', {
      method: id ? 'PUT' : 'POST',
      body: datos
    });
    limpiarFormLibro();
    mostrarMensaje(mensajeLibro, 'Libro guardado', 'exito');
    await cargarCatalogo();
  } catch (error) {
    mostrarMensaje(mensajeLibro, error.message);
  }
});

const cargarUsuarios = async () => {
  const usuarios = await api('/usuario/todos');

  document.getElementById('selectUsuarioPrestamo').innerHTML = usuarios
    .filter((usuario) => usuario.rol === 'usuario')
    .map((usuario) => `<option value="${usuario.id}">${escapar(usuario.nombre)} (${escapar(usuario.email)})</option>`)
    .join('');
};

const cargarPrestamos = async () => {
  const prestamos = await api('/prestamos');

  document.getElementById('tablaPrestamos').innerHTML = prestamos.map((prestamo) => `
    <tr>
      <td>${escapar(prestamo.libro)}</td>
      <td>${escapar(prestamo.usuario)}</td>
      <td>${escapar(prestamo.fecha_prestamo)}</td>
      <td>${escapar(prestamo.fecha_devolucion_tentativa)}</td>
      <td>${escapar(prestamo.fecha_devolucion || '-')}</td>
      <td>${escapar(prestamo.estado)}</td>
      <td>${prestamo.estado === 'activo' ? `<button type="button" onclick="devolverPrestamo(${prestamo.id})">Devolver</button>` : ''}</td>
    </tr>`).join('');
};

async function devolverPrestamo(id) {
  try {
    await api(`/prestamos/${id}/devolver`, { method: 'PATCH' });
    mostrarMensaje(mensajePrestamo, 'Libro devuelto', 'exito');
    await Promise.all([cargarPrestamos(), cargarCatalogo()]);
  } catch (error) {
    mostrarMensaje(mensajePrestamo, error.message);
  }
}

formPrestamo.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    await api('/prestamos', {
      method: 'POST',
      body: {
        libro_id: formPrestamo.libro_id.value,
        usuario_id: formPrestamo.usuario_id.value,
        fecha_prestamo: formPrestamo.fecha_prestamo.value || null,
        fecha_devolucion_tentativa: formPrestamo.fecha_devolucion_tentativa.value
      }
    });
    formPrestamo.reset();
    mostrarMensaje(mensajePrestamo, 'Préstamo registrado', 'exito');
    await Promise.all([cargarPrestamos(), cargarCatalogo()]);
  } catch (error) {
    mostrarMensaje(mensajePrestamo, error.message);
  }
});

const cargarClientes = async () => {
  const clientes = await api('/clientes');

  document.getElementById('selectCliente').innerHTML = clientes
    .map((cliente) => `<option value="${cliente.id}">${escapar(cliente.nombre)} (${escapar(cliente.identificacion)})</option>`)
    .join('');

  document.getElementById('tablaClientes').innerHTML = clientes.map((cliente) => `
    <tr>
      <td>${escapar(cliente.identificacion)}</td>
      <td>${escapar(cliente.nombre)}</td>
      <td>${escapar(cliente.telefono)}</td>
      <td>${escapar(cliente.direccion)}</td>
      <td>${escapar(cliente.email)}</td>
    </tr>`).join('');
};

formCliente.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    await api('/clientes', {
      method: 'POST',
      body: {
        identificacion: formCliente.identificacion.value,
        nombre: formCliente.nombre.value,
        telefono: formCliente.telefono.value,
        direccion: formCliente.direccion.value,
        email: formCliente.email.value
      }
    });
    formCliente.reset();
    mostrarMensaje(mensajeCliente, 'Cliente creado', 'exito');
    await cargarClientes();
  } catch (error) {
    mostrarMensaje(mensajeCliente, error.message);
  }
});

const cargarVentas = async () => {
  const ventas = await api('/ventas');

  document.getElementById('listaVentas').innerHTML = ventas.map((venta) => `
    <div class="caja-venta">
      <strong>Venta #${escapar(venta.id)} | ${escapar(venta.fecha)} | ${escapar(venta.cliente)} | Total: $${escapar(venta.total)}</strong>
      <ul>${venta.libros.map((libro) => `<li>${escapar(libro.titulo)} x${escapar(libro.cantidad)}</li>`).join('')}</ul>
    </div>`).join('') || '<p>No hay ventas registradas</p>';
};

const agregarFilaVenta = () => {
  const fila = document.createElement('div');
  fila.className = 'fila-venta';
  fila.innerHTML = `
    <select class="libro-venta">
      ${catalogo.map((libro) => `<option value="${libro.id}">${escapar(libro.titulo)} ($${escapar(libro.precio)})</option>`).join('')}
    </select>
    <input type="number" class="cantidad-venta" min="1" value="1">
    <button type="button" class="quitar">Quitar</button>`;

  fila.querySelector('.quitar').addEventListener('click', () => fila.remove());
  filasVenta.appendChild(fila);
};

document.getElementById('btnAgregarFila').addEventListener('click', agregarFilaVenta);

formVenta.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const libros = [...filasVenta.querySelectorAll('.fila-venta')].map((fila) => ({
    libro_id: fila.querySelector('.libro-venta').value,
    cantidad: fila.querySelector('.cantidad-venta').value
  }));

  try {
    await api('/ventas', {
      method: 'POST',
      body: {
        cliente_id: formVenta.cliente_id.value,
        fecha: formVenta.fecha.value || null,
        libros
      }
    });
    formVenta.reset();
    filasVenta.innerHTML = '';
    agregarFilaVenta();
    mostrarMensaje(mensajeVenta, 'Venta registrada', 'exito');
    await Promise.all([cargarVentas(), cargarCatalogo()]);
  } catch (error) {
    mostrarMensaje(mensajeVenta, error.message);
  }
});

const iniciar = async () => {
  await Promise.all([cargarCatalogo(), cargarUsuarios(), cargarClientes(), cargarPrestamos(), cargarVentas()]);
  agregarFilaVenta();
};

iniciar();
