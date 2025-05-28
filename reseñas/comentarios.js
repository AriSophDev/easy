const API = 'http://localhost:3000/comentarios';
const ADMIN_CLIENT_ID = 'ADMIN_SUPER_SECRET_ID_007'; // Cambia esto por un ID único y secreto

// Obtener o generar un ID de cliente único para este navegador
let clientId = localStorage.getItem('ecpClientId');
if (!clientId) {
  clientId = '_' + Math.random().toString(36).slice(2, 11); // Un ID un poco más corto
  localStorage.setItem('ecpClientId', clientId);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comentariosForm');
  const nombreInput = document.getElementById('nombreUsuarioInput');
  const comentarioInput = document.getElementById('comentarioInput');
  const list = document.getElementById('comentariosList');

  // Función para renderizar un comentario en la lista
  function addCard({ id, nombre, texto, clientId: owner }) {
    const div = document.createElement('div');
    div.className = 'comentario-item';
    div.dataset.commentId = id; // Guardar el ID del comentario en el elemento

    const nombreElement = document.createElement('strong');
    nombreElement.textContent = (nombre || "Anónimo") + ": "; // Mostrar nombre o "Anónimo"

    const textoElement = document.createElement('span');
    textoElement.textContent = texto;

    div.appendChild(nombreElement);
    div.appendChild(textoElement);

    // Mostrar botón de eliminar si el usuario es el propietario O si es el administrador
    if (owner === clientId || clientId === ADMIN_CLIENT_ID) {
      const btn = document.createElement('button');
      btn.className = 'comentario-delete';
      btn.textContent = 'Eliminar';
      btn.setAttribute('aria-label', `Eliminar comentario de ${nombre || 'Anónimo'}`);
      btn.onclick = () => {
        if (confirm(`¿Estás seguro de que quieres eliminar este comentario?`)) {
          fetch(`${API}/${id}`, { method: 'DELETE' })
            .then(res => {
              if (res.ok) {
                div.remove();
              } else {
                console.error('Error al eliminar comentario en el servidor:', res.status, res.statusText);
                alert('Error al eliminar el comentario. Inténtalo de nuevo.');
              }
            })
            .catch(e => {
              console.error('Error de red al eliminar:', e);
              alert('Error de red al intentar eliminar el comentario.');
            });
        }
      };
      div.appendChild(btn);
    }

    // Añadir al principio de la lista para que los nuevos aparezcan arriba
    list.prepend(div);
    // Opcional: scrollIntoView si prefieres que se desplace al nuevo comentario
    // div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 1) Cargar todos los comentarios al iniciar
  fetch(API)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP al cargar comentarios: ${res.status}`);
      }
      return res.json();
    })
    .then(comentarios => {
      list.innerHTML = ''; // Limpiar lista antes de añadir (por si acaso)
      comentarios.forEach(addCard);
    })
    .catch(e => {
      console.error('Error al cargar comentarios:', e);
      list.innerHTML = '<p class="error-mensaje">No se pudieron cargar los comentarios. Intenta recargar la página.</p>';
    });

  // 2) Enviar un nuevo comentario
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombreUsuario = nombreInput.value.trim();
    const textoComentario = comentarioInput.value.trim();

    if (!textoComentario) {
      alert('El comentario no puede estar vacío.');
      comentarioInput.focus();
      return;
    }

    const payload = {
      nombre: nombreUsuario || "Anónimo", // Usar "Anónimo" si no se provee nombre
      texto: textoComentario,
      clientId, // ID del cliente que envía el comentario
      createdAt: new Date().toISOString() // Fecha de creación
    };

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP al enviar comentario: ${res.status}`);
      }
      return res.json();
    })
    .then(nuevoComentario => {
      addCard(nuevoComentario); // Añadir el nuevo comentario a la lista
      comentarioInput.value = ''; // Limpiar campo de comentario
      nombreInput.value = '';   // Limpiar campo de nombre
      comentarioInput.focus(); // Devolver el foco al campo de comentario
    })
    .catch(e => {
      console.error('Error al enviar comentario:', e);
      alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    });
  });
});