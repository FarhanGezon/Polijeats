const ORD_KEY = "polijeats_orders";
// ponytail: riwayat di localStorage single-device; pindah ke DB/API saat butuh multi-device/laporan admin.

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORD_KEY)) || []; }
  catch { return []; }
}
function saveOrders(o) { localStorage.setItem(ORD_KEY, JSON.stringify(o)); }
function waNum(n) { return "62" + String(n || "").replace(/\D/g, "").replace(/^0+/, "").replace(/^62/, ""); }

function openPay() {
  if (!cart.length) { alert("Keranjang masih kosong."); return; }
  closeModal("cartModal");
  document.getElementById("payBody").classList.remove("hidden");
  document.getElementById("paySuccess").classList.add("hidden");
  document.getElementById("payTotal").textContent = fmt(cartTotal());
  document.getElementById("payItems").innerHTML = cart.map((i) =>
    `<div class="flex justify-between"><span>${i.name} x${i.qty}</span><span>${fmt(i.price * i.qty)}</span></div>`
  ).join("");
  openModal("payModal");
}

function completePay() {
  if (!cart.length) return;
  const buyer = document.getElementById("buyerName").value || "-";
  const pickup = document.getElementById("pickupTime").value || "-";
  const order = {
    id: "PJ-" + Date.now().toString(36).toUpperCase(),
    at: new Date().toISOString(),
    buyer, pickup,
    items: cart.map((i) => {
      const m = findMenu(i.name) || {};
      return { name: i.name, qty: i.qty, price: i.price, toko: m.toko || "-", penjual: m.penjual || "-", wa: m.wa || "" };
    }),
    total: cartTotal(),
  };
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
  cart = [];
  saveMenus(); renderGrid(); renderCart();
  document.getElementById("payBody").classList.add("hidden");
  document.getElementById("paySuccess").classList.remove("hidden");
  document.getElementById("payOrderInfo").textContent = `${order.id} • ${fmt(order.total)} • ${buyer}`;
  const bySeller = {};
  order.items.forEach((i) => {
    (bySeller[i.wa] ||= { penjual: i.penjual, toko: i.toko, items: [] }).items.push(`${i.name} x${i.qty}`);
  });
  document.getElementById("payWALinks").innerHTML = Object.entries(bySeller).map(([wa, s]) => {
    const msg = encodeURIComponent(`Halo ${s.penjual}! Saya ${buyer} sudah bayar QRIS ${order.id} (${fmt(order.total)}): ${s.items.join(", ")}. Berikut bukti bayarnya.`);
    return wa && wa !== ""
      ? `<a href="https://wa.me/${waNum(wa)}?text=${msg}" target="_blank" class="block w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-lg text-center">Konfirmasi ke ${s.penjual} (${s.toko}) via WA</a>`
      : `<p class="text-xs text-gray-500">WA ${s.penjual} belum tersedia.</p>`;
  }).join("");
}
