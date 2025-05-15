let blurShown = false;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-ecp');
    if (!header) return;
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
        if (!blurShown) {
            header.classList.add('blur-anim');
            blurShown = true;
            setTimeout(() => {
                header.classList.remove('blur-anim');
            }, 400);
        }
    } else {
        header.classList.remove('scrolled');
        header.classList.remove('blur-anim');
        blurShown = false;
    }
});