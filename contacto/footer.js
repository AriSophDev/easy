document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer-ecp');
    let visible = false;

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        // Si es móvil, siempre visible
        if (window.innerWidth <= 700) return true;
        return (
            rect.top < window.innerHeight * 0.9 &&
            rect.bottom > window.innerHeight * 0.2
        );
    }

    function checkAnim() {
        if (isInViewport(footer)) {
            if (!visible) {
                footer.classList.remove('anim-out');
                footer.classList.add('anim-in');
                visible = true;
            }
        } else {
            if (visible) {
                footer.classList.remove('anim-in');
                footer.classList.add('anim-out');
                visible = false;
            }
        }
    }

    window.addEventListener('scroll', checkAnim);
    window.addEventListener('resize', checkAnim);
    checkAnim();
});