let cart = [];

function findMenu(name) { return MENUS.find((m) => m.menu === name); }
function addToCart(name) {
  const m = findMenu(name);
  if (!m || m.status !== "buka" || m.stock < 1) { alert("Menu tidak tersedia."); return; }
  m.stock--;
  const f = cart.find((i) => i.name === name);
  if (f) f.qty++;
  else cart.push({ name, price: m.harga, qty: 1 });
  saveMenus(); renderGrid(); renderCart();
  openModal("cartModal");
}

function chg(ix, d) {
  const it = cart[ix]; const m = findMenu(it.name);
  if (d > 0) {
    if (!m || m.stock < 1) { alert("Stok habis."); return; }
    m.stock--; it.qty++;
  } else {
    if (m) m.stock++;
    it.qty--;
    if (it.qty < 1) cart.splice(ix, 1);
  }
  saveMenus(); renderGrid(); renderCart();
}

function cartTotal() { return cart.reduce((t, i) => t + i.price * i.qty, 0); }

function renderCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = cart.map((it, ix) =>
    `<div class="flex justify-between items-center border rounded-lg px-3 py-2 text-sm"><div><p class="font-semibold">${it.name}</p><p class="text-gray-500">${fmt(it.price)}</p></div><div class="flex items-center gap-2"><button data-cart="${ix}|-1" class="w-6 h-6 border rounded">-</button><span>${it.qty}</span><button data-cart="${ix}|1" class="w-6 h-6 border rounded">+</button></div></div>`
  ).join("");
  document.getElementById("cartTotal").textContent = fmt(cartTotal());
  document.getElementById("emptyMsg").style.display = cart.length ? "none" : "";
  const badge = document.getElementById("cartCount");
  const n = cart.reduce((t, i) => t + i.qty, 0);
  badge.textContent = n;
}

