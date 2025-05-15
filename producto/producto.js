document.addEventListener('DOMContentLoaded', function () {
    // --- VARIABLES DEL CARRITO ---
    let allProducts = [];
    let total = 0;
    let countProducts = 0;

    const cartBtn = document.getElementById("cartBtn");
    const cartContainer = document.getElementById("cartContainer");
    const cartItems = document.getElementById("cart-items");
    const cartEmpty = document.getElementById("cart-empty");
    const totalPagar = document.getElementById("total-pagar");
    const btnVaciarCarro = document.getElementById("btnVaciarCarro");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartCountBadge = document.getElementById('cart-count-badge');

    // --- ABRIR Y CERRAR CARRITO ---
    function abrirCarrito() {
        cartContainer.classList.remove("hidden-cart");
        cartContainer.classList.remove("anim-out");
        cartContainer.classList.add("anim-in");
        if (cartOverlay) cartOverlay.classList.add("active");
    }
    function cerrarCarrito() {
        cartContainer.classList.remove("anim-in");
        cartContainer.classList.add("anim-out");
        if (cartOverlay) cartOverlay.classList.remove("active");
        setTimeout(() => {
            cartContainer.classList.add("hidden-cart");
        }, 500);
    }

    if (cartBtn) cartBtn.addEventListener("click", abrirCarrito);
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", cerrarCarrito);
    if (cartOverlay) cartOverlay.addEventListener("click", cerrarCarrito);

    // --- VACIAR CARRITO ---
    if (btnVaciarCarro) {
        btnVaciarCarro.addEventListener("click", () => {
            allProducts = [];
            total = 0;
            countProducts = 0;
            updateCartUI();
        });
    }

    // --- AGREGAR PRODUCTO AL CARRITO ---
    document.querySelectorAll(".agregar-carro").forEach(btn => {
        btn.addEventListener("click", () => {
            const cantidad = parseInt(document.getElementById("cantidadProducto").value) || 1;
            const product = {
                id: 1,
                nameProduct: "Easy Clean Pro",
                price: 12990,
                quantity: cantidad,
                img: "ChatGPT_Image_25_abr_2025_14_38_47.webp" // Imagen de WhatsApp
            };
            onAddProduct(product);
            abrirCarrito();

            // Feedback visual
            const feedback = document.getElementById("productoFeedback");
            if (feedback) {
                feedback.textContent = "Producto añadido al carrito";
                feedback.style.color = "#2563eb";
                setTimeout(() => feedback.textContent = "", 2000);
            }
        });
    });

    // --- SUMAR/RESTAR CANTIDAD ---
    const inputCantidad = document.getElementById('cantidadProducto');
    const btnSumar = document.getElementById('sumarCantidad');
    const btnRestar = document.getElementById('restarCantidad');

    if (btnSumar && btnRestar && inputCantidad) {
        btnSumar.addEventListener('click', () => {
            let val = parseInt(inputCantidad.value) || 1;
            if (val < parseInt(inputCantidad.max)) inputCantidad.value = val + 1;
        });
        btnRestar.addEventListener('click', () => {
            let val = parseInt(inputCantidad.value) || 1;
            if (val > parseInt(inputCantidad.min)) inputCantidad.value = val - 1;
        });
    }

    // --- ACTUALIZAR UI DEL CARRITO ---
    function updateCartUI() {
        cartItems.innerHTML = '';
        if (allProducts.length === 0) {
            cartEmpty.style.display = 'block';
        } else {
            cartEmpty.style.display = 'none';
            allProducts.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('cart-product');
                item.innerHTML = `
                    <div class="cart-product-img">
                        <span class="cantidad-producto-carrito">${product.quantity}</span>
                        <img src="${product.img}" alt="${product.nameProduct}" />
                    </div>
                    <div class="info-cart-product">
                        <p class="titulo-producto-carrito">${product.nameProduct}</p>
                        <span class="precio-producto-carrito">$${product.price.toLocaleString('es-CL')}</span>
                    </div>
                    <button class="eliminar-producto" data-id="${product.id}">Eliminar</button>
                `;
                cartItems.appendChild(item);
            });
            cartItems.querySelectorAll('.eliminar-producto').forEach(btn => {
                btn.addEventListener('click', function () {
                    onDeleteProduct(parseInt(this.getAttribute('data-id')));
                });
            });
        }
        total = allProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
        countProducts = allProducts.reduce((acc, p) => acc + p.quantity, 0);
        totalPagar.textContent = `$${total.toLocaleString('es-CL')}`;

        // Badge animado
        if (cartCountBadge) {
            if (countProducts > 0) {
                cartCountBadge.textContent = countProducts;
                cartCountBadge.classList.remove('badge-out');
                cartCountBadge.style.display = 'inline-block';
                void cartCountBadge.offsetWidth;
                cartCountBadge.classList.add('badge-in');
            } else {
                cartCountBadge.classList.remove('badge-in');
                cartCountBadge.classList.add('badge-out');
                setTimeout(() => {
                    cartCountBadge.style.display = 'none';
                }, 350);
            }
        }
    }

    // --- AGREGAR/ELIMINAR PRODUCTOS ---
    function onAddProduct(product) {
        const found = allProducts.find(p => p.id === product.id);
        if (found) {
            found.quantity += product.quantity;
        } else {
            allProducts.push({ ...product });
        }
        updateCartUI();
    }
    function onDeleteProduct(id) {
        allProducts = allProducts.filter(p => p.id !== id);
        updateCartUI();
    }
});