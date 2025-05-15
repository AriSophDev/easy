document.addEventListener('DOMContentLoaded', function () {
  // Animación de entrada/salida para la sección producto
  const section = document.querySelector('.producto-section');
  let visible = false;

  function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top < window.innerHeight * 0.7 &&
          rect.bottom > window.innerHeight * 0.2
      );
  }

  function checkAnim() {
      if (isInViewport(section)) {
          if (!visible) {
              section.classList.remove('anim-out');
              section.classList.add('anim-in');
              visible = true;
          }
      } else {
          if (visible) {
              section.classList.remove('anim-in');
              section.classList.add('anim-out');
              visible = false;
          }
      }
  }

  window.addEventListener('scroll', checkAnim);
  window.addEventListener('resize', checkAnim);
  checkAnim();

  // --- CARRITO DE COMPRAS INMERSIVO ---
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

  // Animación inmersiva de entrada/salida del carrito
  let isCartVisible = false;
  cartBtn.addEventListener("click", () => {
      if (cartContainer.classList.contains("hidden-cart")) {
          cartContainer.classList.remove("hidden-cart");
          cartContainer.classList.remove("anim-out");
          cartContainer.classList.add("anim-in");
          if (cartOverlay) cartOverlay.classList.add("active");
          isCartVisible = true;
      } else {
          cartContainer.classList.remove("anim-in");
          cartContainer.classList.add("anim-out");
          if (cartOverlay) cartOverlay.classList.remove("active");
          setTimeout(() => {
              cartContainer.classList.add("hidden-cart");
              isCartVisible = false;
          }, 500);
      }
  });

  // Botón cerrar carrito (equis)
  if (cartCloseBtn && cartContainer) {
      cartCloseBtn.addEventListener("click", () => {
          cartContainer.classList.remove("anim-in");
          cartContainer.classList.add("anim-out");
          if (cartOverlay) cartOverlay.classList.remove("active");
          setTimeout(() => {
              cartContainer.classList.add("hidden-cart");
          }, 500);
      });
  }

  // También cierra el carrito si hacen click en el overlay
  if (cartOverlay) {
      cartOverlay.addEventListener("click", () => {
          cartContainer.classList.remove("anim-in");
          cartContainer.classList.add("anim-out");
          cartOverlay.classList.remove("active");
          setTimeout(() => {
              cartContainer.classList.add("hidden-cart");
          }, 500);
      });
  }

  if (btnVaciarCarro) {
      btnVaciarCarro.addEventListener("click", () => {
          allProducts = [];
          total = 0;
          countProducts = 0;
          updateCartUI();
      });
  }

  function onAddProduct(product) {
      const found = allProducts.find(p => p.id === product.id);
      if (found) {
          found.quantity += product.quantity;
      } else {
          allProducts.push({ ...product });
      }
      total = allProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
      countProducts = allProducts.reduce((acc, p) => acc + p.quantity, 0);
      updateCartUI();
  }

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
                    <img src="ChatGPT_Image_25_abr_2025_14_38_47.webp" alt="${product.nameProduct}" />
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
    totalPagar.textContent = `$${total.toLocaleString('es-CL')}`;

    // Actualiza el badge del carrito con animación inmersiva
    const cartCountBadge = document.getElementById('cart-count-badge');
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

  function onDeleteProduct(id) {
      const product = allProducts.find(p => p.id === id);
      if (!product) return;
      allProducts = allProducts.filter(p => p.id !== id);
      total = allProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
      countProducts = allProducts.reduce((acc, p) => acc + p.quantity, 0);
      updateCartUI();
  }

  // Asigna el evento a todos los botones de agregar al carrito
  document.querySelectorAll(".agregar-carro").forEach(btn => {
      btn.addEventListener("click", () => {
          const cantidad = parseInt(document.getElementById("cantidadProducto").value) || 1;
          const product = {
              id: 1,
              nameProduct: "Easy Clean Pro",
              price: 12990,
              quantity: cantidad,
          };
          onAddProduct(product);

          // Mostrar el carrito automáticamente al agregar producto
          cartContainer.classList.remove("hidden-cart");
          cartContainer.classList.remove("anim-out");
          cartContainer.classList.add("anim-in");
          if (cartOverlay) cartOverlay.classList.add("active");

          // Feedback visual
          const feedback = document.getElementById("productoFeedback");
          if (feedback) {
              feedback.textContent = "Producto añadido al carrito";
              feedback.style.color = "#2563eb";
              setTimeout(() => feedback.textContent = "", 2000);
          }
      });
  });

  // --- BOTONES SUMAR/RESTAR CANTIDAD ---
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
});