const CAT_ICON = { makanan: ["\u{1F35B}", "bg-[#d9f2fc]"], snack: ["\u{1F37F}", "bg-amber-100"], minuman: ["\u{1F9CB}", "bg-sky-100"] };
const fmt = (n) => "Rp" + n.toLocaleString("id-ID");
let activeCat = "semua";

function isAvail(m) { return m.status === "buka" && m.stock > 0; }
function cardHTML(m) {
  const [defIcon, bg] = CAT_ICON[m.cat] || CAT_ICON.makanan;
  const icon = m.icon || defIcon;
  const ok = isAvail(m);
  return `<div class="card bg-white rounded-xl shadow overflow-hidden cursor-pointer" data-cat="${m.cat}" data-status="${m.status}" data-avail="${ok ? "ada" : "habis"}" data-name="${(m.menu + " " + m.toko + " " + m.penjual).toLowerCase()}" data-menu="${m.menu}">`
    + `<div class="relative h-32 ${bg} flex items-center justify-center text-5xl">${icon}<span class="absolute top-2 left-2 ${ok ? "bg-green-500" : "bg-gray-400"} text-white text-xs font-bold px-2 py-0.5 rounded">${ok ? "Tersedia" : "Tidak Tersedia"}</span></div>`
    + `<div class="p-4"><p class="text-xs text-gray-500">${m.toko} • ${m.penjual}</p><p class="text-xs text-gray-400">${m.jam}</p><p class="text-xs ${ok ? "text-gray-400" : "text-red-500 font-semibold"}">Stok: ${m.stock > 0 ? m.stock : "Habis"}</p>`
    + `<h3 class="font-bold mt-1">${m.menu}</h3><p class="text-[#08afe6] font-bold text-sm">${fmt(m.harga)}</p>`
    + (ok
      ? `<button class="tambah-btn mt-2 w-full bg-[#08afe6] hover:bg-[#0793c2] text-white text-sm font-semibold py-2 rounded-lg" data-menu="${m.menu}">+ Tambah Pesanan</button>`
      : `<button class="tambah-btn mt-2 w-full bg-gray-300 text-gray-500 text-sm font-semibold py-2 rounded-lg" disabled>+ Tambah Pesanan</button>`)
    + `</div></div>`;
}
function openDetail(name) {
  const m = MENUS.find((x) => x.menu === name);
  if (!m) return;
  const ok = isAvail(m);
  document.getElementById("dIcon").textContent = m.icon || "";
  document.getElementById("dBadge").textContent = ok ? "Tersedia" : "Tidak Tersedia";
  document.getElementById("dBadge").className = "text-xs font-bold px-2 py-0.5 rounded text-white " + (ok ? "bg-green-500" : "bg-gray-400");
  document.getElementById("dMenu").textContent = m.menu;
  document.getElementById("dShop").textContent = m.toko + " • " + m.penjual + " • " + m.jam;
  document.getElementById("dPrice").textContent = fmt(m.harga) + " • Stok: " + (m.stock > 0 ? m.stock : "Habis");
  document.getElementById("dDesc").textContent = m.desc || "-";
  document.getElementById("dWA").textContent = m.wa || "-";
  const btn = document.getElementById("dAddBtn");
  btn.dataset.menu = m.menu;
  btn.disabled = !ok;
  btn.className = ok
    ? "mt-4 w-full bg-[#08afe6] hover:bg-[#0793c2] text-white text-sm font-semibold py-2.5 rounded-lg"
    : "mt-4 w-full bg-gray-300 text-gray-500 text-sm font-semibold py-2.5 rounded-lg";
  openModal("detailModal");
}

function renderGrid() {
  document.getElementById("grid").innerHTML = MENUS.map(cardHTML).join("");
  applyFilter();
}

function applyFilter() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const s = document.getElementById("statusFilter").value;
  document.querySelectorAll(".card").forEach((c) => {
    const ok = (activeCat === "semua" || c.dataset.cat === activeCat)
      && (s === "semua" || (s === "ada" ? c.dataset.avail === "ada" : s === "habis" ? c.dataset.avail === "habis" : c.dataset.status === s))
      && c.dataset.name.includes(q);
    c.style.display = ok ? "" : "none";
  });
}

function setTab(btn) {
  activeCat = btn.dataset.cat;
  document.querySelectorAll(".tab-btn").forEach((x) => x.classList.remove("tab-active"));
  btn.classList.add("tab-active");
  applyFilter();
}

function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }
