const slides = document.querySelectorAll('.carrusel-slide');
let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.onclick = () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };
    nextBtn.onclick = () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    };

    // Cambio automático cada 6 segundos
    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);
}

