document.addEventListener('DOMContentLoaded', function() {
    const carruselImgs = document.querySelectorAll('.carrusel-img');
    const modalBg = document.getElementById('carruselModal');
    const modalImg = document.getElementById('carruselModalImg');

    carruselImgs.forEach(img => {
        img.addEventListener('click', function() {
            if (img.classList.contains('active')) {
                modalImg.src = img.src;
                modalBg.classList.add('active');
            }
        });
    });

    modalBg.addEventListener('click', function(e) {
        if (e.target === modalBg) {
            modalBg.classList.remove('active');
            modalImg.src = '';
        }
    });
});