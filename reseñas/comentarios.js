// Ya no se necesita: import { db } from './firebase-init.js';

const ADMIN_CLIENT_ID = 'ADMIN_SUPER_SECRET_ID_007';

let clientId = localStorage.getItem('ecpClientId');
if (!clientId) {
  clientId = '_' + Math.random().toString(36).slice(2, 11);
  localStorage.setItem('ecpClientId', clientId);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
    console.error("Firebase Firestore (compat) no está disponible. Revisa firebase-init.js y los scripts CDN.");
    // Podrías mostrar un mensaje al usuario aquí
    const list = document.getElementById('comentariosList');
    if (list) {
        list.innerHTML = '<p class="error-mensaje">Error al conectar con el servicio de comentarios.</p>';
    }
    return;
  }

  const db = firebase.firestore(); // Obtén la instancia de Firestore aquí

  const form = document.getElementById('comentariosForm');
  const nombreInput = document.getElementById('nombreUsuarioInput');
  const comentarioInput = document.getElementById('comentarioInput');
  const list = document.getElementById('comentariosList');

  // Función para renderizar un comentario en la lista
  function addCard({ id, nombre, texto, clientId: owner }) {
    const div = document.createElement('div');
    div.className = 'comentario-item';
    div.dataset.commentId = id;

    const nombreElement = document.createElement('strong');
    nombreElement.textContent = (nombre || "Anónimo") + ": ";

    const textoElement = document.createElement('span');
    textoElement.textContent = texto;

    div.appendChild(nombreElement);
    div.appendChild(textoElement);

    if (owner === clientId || clientId === ADMIN_CLIENT_ID) {
      const btn = document.createElement('button');
      btn.className = 'comentario-delete';
      btn.textContent = 'Eliminar';
      btn.setAttribute('aria-label', `Eliminar comentario de ${nombre || 'Anónimo'}`);
      btn.onclick = () => {
        if (confirm(`¿Estás seguro de que quieres eliminar este comentario?`)) {
          db.collection('comentarios').doc(id).delete()
            .then(() => {
              div.remove();
              console.log("Comentario eliminado de Firestore!");
            })
            .catch(e => {
              console.error('Error al eliminar comentario en Firestore:', e);
              alert('Error al eliminar el comentario. Inténtalo de nuevo.');
            });
        }
      };
      div.appendChild(btn);
    }
    list.prepend(div);
  }

  // 1) Cargar todos los comentarios al iniciar
  db.collection('comentarios').orderBy('createdAt', 'desc').get()
    .then(querySnapshot => {
      list.innerHTML = '';
      querySnapshot.forEach(doc => {
        const comentario = doc.data();
        addCard({ id: doc.id, ...comentario });
      });
    })
    .catch(e => {
      console.error('Error al cargar comentarios desde Firestore:', e);
      if (list) {
        list.innerHTML = '<p class="error-mensaje">No se pudieron cargar los comentarios. Intenta recargar la página.</p>';
      }
    });

  // 2) Enviar un nuevo comentario
  if (form) {
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
        nombre: nombreUsuario || "Anónimo",
        texto: textoComentario,
        clientId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      db.collection('comentarios').add(payload)
      .then(docRef => {
        console.log("Comentario añadido a Firestore con ID: ", docRef.id);
        // Para una UI más rápida sin onSnapshot, podemos añadirlo con los datos que tenemos:
        const tempPayloadForUI = {...payload, createdAt: new Date()}; // Usamos fecha local para la UI
        addCard({id: docRef.id, ...tempPayloadForUI});

        comentarioInput.value = '';
        nombreInput.value = '';
        comentarioInput.focus();
      })
      .catch(e => {
        console.error('Error al enviar comentario a Firestore:', e);
        alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
      });
    });
  } else {
    console.error("Formulario de comentarios no encontrado.");
  }
});