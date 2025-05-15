document.addEventListener('DOMContentLoaded', function() {
    const carruselImgs = document.querySelectorAll('.carrusel-img');
    const prevBtn = document.querySelector('.carrusel-btn.prev');
    const nextBtn = document.querySelector('.carrusel-btn.next');
    let currentImg = 0;

    function showImg(idx) {
        carruselImgs.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
    }
    if (prevBtn && nextBtn && carruselImgs.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentImg = (currentImg - 1 + carruselImgs.length) % carruselImgs.length;
            showImg(currentImg);
        });
        nextBtn.addEventListener('click', () => {
            currentImg = (currentImg + 1) % carruselImgs.length;
            showImg(currentImg);
        });
        showImg(currentImg);
    }
});