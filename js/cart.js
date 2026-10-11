let cart = [];

function addToCart(name, price) {
  const f = cart.find((i) => i.name === name);
  if (f) f.qty++;
  else cart.push({ name, price, qty: 1 });
  renderCart();
  openModal("cartModal");
}

function chg(ix, d) {
  cart[ix].qty += d;
  if (cart[ix].qty < 1) cart.splice(ix, 1);
  renderCart();
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

function sendWA() {
  if (!cart.length) { alert("Keranjang masih kosong."); return; }
  const nama = document.getElementById("buyerName").value || "-";
  const jam = document.getElementById("pickupTime").value || "-";
  const lines = cart.map((i) => `- ${i.name} x${i.qty} = ${fmt(i.price * i.qty)}`);
  const msg = `Halo! Pesanan Polijeats%0A%0A${lines.join("%0A")}%0A%0ATotal: ${fmt(cartTotal())}%0ANama: ${nama}%0AJam ambil: ${jam}`;
  window.open("https://wa.me/?text=" + msg, "_blank");
}
