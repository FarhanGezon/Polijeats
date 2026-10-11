const CAT_ICON = { makanan: ["\u{1F35B}", "bg-orange-100"], snack: ["\u{1F37F}", "bg-amber-100"], minuman: ["\u{1F9CB}", "bg-sky-100"] };
const fmt = (n) => "Rp" + n.toLocaleString("id-ID");
let activeCat = "semua";

function cardHTML(m) {
  const [defIcon, bg] = CAT_ICON[m.cat] || CAT_ICON.makanan;
  const icon = m.icon || defIcon;
  const open = m.status === "buka";
  return `<div class="card bg-white rounded-xl shadow overflow-hidden" data-cat="${m.cat}" data-status="${m.status}" data-name="${(m.menu + " " + m.toko + " " + m.penjual).toLowerCase()}">`
    + `<div class="relative h-32 ${bg} flex items-center justify-center text-5xl">${icon}<span class="absolute top-2 left-2 ${open ? "bg-green-500" : "bg-gray-400"} text-white text-xs font-bold px-2 py-0.5 rounded">${open ? "BUKA" : "TUTUP"}</span></div>`
    + `<div class="p-4"><p class="text-xs text-gray-500">${m.toko} • ${m.penjual}</p><p class="text-xs text-gray-400">${m.jam}</p>`
    + `<h3 class="font-bold mt-1">${m.menu}</h3><p class="text-orange-600 font-bold text-sm">${fmt(m.harga)}</p>`
    + (open
      ? `<button class="tambah-btn mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg" data-menu="${m.menu}" data-harga="${m.harga}">+ Tambah Pesanan</button>`
      : `<button class="tambah-btn mt-2 w-full bg-gray-300 text-gray-500 text-sm font-semibold py-2 rounded-lg" disabled>+ Tambah Pesanan</button>`)
    + `</div></div>`;
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
      && (s === "semua" || c.dataset.status === s)
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
