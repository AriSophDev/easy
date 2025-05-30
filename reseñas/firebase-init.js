// Ya no se necesitan los imports aquí si usas los scripts CDN compat

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfeld1gL7mNpSf2L9XiXgLL0CqN6ZiNxU", // ¡Asegúrate de que esta es tu clave real y mantenla segura!
  authDomain: "easyclean-pro-comentarios.firebaseapp.com",
  projectId: "easyclean-pro-comentarios",
  storageBucket: "easyclean-pro-comentarios.appspot.com", // Generalmente es .appspot.com
  messagingSenderId: "120001213209",
  appId: "1:120001213209:web:16a0606dbd53020a750b88",
  measurementId: "G-TQ4HW4J2H2" // Opcional
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && typeof firebase.initializeApp === 'function') {
  firebase.initializeApp(firebaseConfig);
  // const analytics = firebase.analytics(); // Si necesitas analytics con la API compatible
  console.log("Firebase initialized (compat mode)");
} else {
  console.error("Firebase SDK (compat) no cargado. Revisa los scripts en index.html.");
}

// Para que 'db' esté disponible para comentarios.js, puedes definirlo globalmente aquí
// o que comentarios.js lo obtenga directamente.
// Por simplicidad, comentarios.js puede llamar a firebase.firestore().