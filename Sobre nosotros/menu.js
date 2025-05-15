const menuIcon = document.getElementById('menuIcon');
const menuDropdown = document.getElementById('menuDropdown');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenuBtn = document.getElementById('closeMenu');

function closeMenuAnimated() {
    if (!menuDropdown || !menuOverlay) return;
    if (menuDropdown.classList.contains('closing')) return;
    menuDropdown.classList.add('closing');
    setTimeout(() => {
        menuDropdown.classList.remove('active', 'closing');
        menuOverlay.classList.remove('active');
    }, 400);
}

function openMenu() {
    if (!menuDropdown || !menuOverlay) return;
    if (menuDropdown.classList.contains('closing')) return;
    menuDropdown.classList.remove('closing');
    menuDropdown.classList.add('active');
    menuOverlay.classList.add('active');
}

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        if (menuDropdown && menuDropdown.classList.contains('active')) {
            closeMenuAnimated();
        } else if (menuDropdown && !menuDropdown.classList.contains('closing')) {
            openMenu();
        }
    });
}
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenuAnimated);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenuAnimated);

// Cierra el menú al hacer clic en cualquier enlace del menú
document.querySelectorAll('.menu-dropdown a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenuAnimated();
    });
});