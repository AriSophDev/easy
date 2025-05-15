document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.easyclean-bg-section .fade-in');

    // Función para manejar la animación de entrada y salida
    const handleScrollAnimations = () => {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación
        const triggerTop = window.innerHeight * 0.15; // Punto de desactivación

        fadeEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < triggerBottom && rect.bottom > triggerTop;

            if (isVisible) {
                el.classList.add('visible'); // Añade la animación de entrada
            } else {
                el.classList.remove('visible'); // Elimina la animación (salida)
            }
        });
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScrollAnimations);

    // Ejecutar al cargar la página
    handleScrollAnimations();
});