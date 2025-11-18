// cart.js — render cart, quantity, remove, totals
document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "cart";
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartItemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const itemCountEl = document.getElementById("itemCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearBtn = document.getElementById("clearCartBtn");

  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function formatRupee(n){
    return "₹" + Number(n).toLocaleString('en-IN');
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";
    if (!cart || cart.length === 0) {
      cartItemsEl.innerHTML = `<div class="empty"><p>Your cart is empty.</p></div>`;
      totalEl.textContent = "₹0";
      itemCountEl.textContent = "0";
      return;
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, idx) => {
      const qty = item.qty ?? 1;
      total += Number(item.price) * qty;
      count += qty;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" class="cart-img" alt="${escapeHtml(item.name)}">
        <div class="cart-info">
          <h3>${escapeHtml(item.name)}</h3>
          <p>Price: ${formatRupee(item.price)}</p>
        </div>

        <div class="cart-controls">
          <div class="qty-box">
            <button class="qty-dec" data-idx="${idx}">−</button>
            <div class="qty-val">${qty}</div>
            <button class="qty-inc" data-idx="${idx}">+</button>
          </div>
          <button class="remove-btn" data-idx="${idx}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(itemDiv);
    });

    totalEl.textContent = formatRupee(total);
    itemCountEl.textContent = String(count);

    // attach handlers
    document.querySelectorAll(".qty-inc").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        cart[i].qty = (cart[i].qty || 1) + 1;
        saveCart(); renderCart();
      });
    });

    document.querySelectorAll(".qty-dec").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        cart[i].qty = Math.max(1, (cart[i].qty || 1) - 1);
        saveCart(); renderCart();
      });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        cart.splice(i, 1);
        saveCart(); renderCart();
      });
    });
  }

  function escapeHtml(text){
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


  // checkout / clear
  checkoutBtn.addEventListener("click", () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // Demo behavior: clear cart and show success
    alert("Checkout simulated — thank you!");
    cart = [];
    saveCart();
    renderCart();
  });

  clearBtn.addEventListener("click", () => {
    if (!confirm("Clear the cart?")) return;
    cart = [];
    saveCart();
    renderCart();
  });

  // initial render
  renderCart();
});