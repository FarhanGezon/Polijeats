let editingIx = -1;
const isAdmin = () => sessionStorage.getItem("polijeats_admin") === "1";

function showPanel() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("panelBox").classList.remove("hidden");
  document.getElementById("rekapBox").classList.remove("hidden");
  document.getElementById("logoutBtn").classList.remove("hidden");
  editingIx = -1;
  renderAdmin();
  renderRekap();
}
function doLogin() {
  const u = document.getElementById("adminUser").value.trim();
  if (u === "admin" && document.getElementById("adminPass").value === "admin123") {
    sessionStorage.setItem("polijeats_admin", "1");
    document.getElementById("loginErr").classList.add("hidden");
    showPanel();
  } else document.getElementById("loginErr").classList.remove("hidden");
}

function renderAdmin() {
  document.getElementById("adminRows").innerHTML =
    MENUS.map((m, ix) => (ix === editingIx ? editRowHTML(m, ix) : rowHTML(m, ix))).join("");
  document.getElementById("adminCount").textContent = MENUS.length + " menu tersimpan (localStorage)";
}
function availOf(m) { return m.status === "buka" && m.stock > 0; }
function rowHTML(m, ix) {
  const open = m.status === "buka";
  const ok = availOf(m);
  return `<tr class="border-b"><td class="py-2"><p class="font-semibold">${m.menu}</p><p class="text-xs text-gray-500">${m.toko} • ${m.penjual} • Stok ${m.stock}</p></td>`
    + `<td>${fmt(m.harga)}</td><td>${m.stock}</td>`
    + `<td><div class="flex flex-col gap-1">`
    + `<button data-adm="toggle|${ix}" title="Ubah status toko buka/tutup" class="text-xs font-bold px-2 py-1 rounded ${open ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}">Toko: ${open ? "BUKA" : "TUTUP"}</button>`
    + `<button data-adm="avail|${ix}" title="Ubah status ketersediaan produk" class="text-xs font-bold px-2 py-1 rounded ${ok ? "bg-green-500 text-white" : "bg-gray-400 text-white"}">${ok ? "Tersedia" : "Tidak Tersedia"}</button>`
    + `</div></td>`
    + `<td class="text-right whitespace-nowrap"><button data-adm="edit|${ix}" class="text-xs border rounded px-2 py-1 mr-1">Edit</button><button data-adm="del|${ix}" class="text-xs border border-red-300 text-red-500 rounded px-2 py-1">Hapus</button></td></tr>`;
}
function editRowHTML(m, ix) {
  return `<tr class="border-b bg-sky-50"><td class="py-2"><input id="eMenu" value="${m.menu}" class="border rounded px-2 py-1 text-sm w-full">`
    + `<input id="eDesc" value="${m.desc || ""}" placeholder="Deskripsi..." class="border rounded px-2 py-1 text-xs w-full mt-1"></td>`
    + `<td><input id="eHarga" type="number" value="${m.harga}" class="border rounded px-2 py-1 text-sm w-24"></td>`
    + `<td><input id="eStok" type="number" value="${m.stock}" class="border rounded px-2 py-1 text-sm w-20"></td>`
    + `<td><input id="eWA" value="${m.wa || ""}" placeholder="No. WA..." class="border rounded px-2 py-1 text-xs w-24"></td>`
    + `<td class="text-right whitespace-nowrap"><button data-adm="save|${ix}" class="text-xs bg-[#08afe6] text-white rounded px-2 py-1 mr-1">Simpan</button><button data-adm="cancel|x" class="text-xs border rounded px-2 py-1">Batal</button></td></tr>`;
}

function adminAct(act, ix) {
  const m = MENUS[ix];
  if (act === "toggle" && m) { m.status = m.status === "buka" ? "tutup" : "buka"; saveMenus(); renderAdmin(); }
  else if (act === "avail" && m) {
    // paksa ketersediaan: Tersedia = buka + stok min 1; Tidak Tersedia = tutup
    if (availOf(m)) m.status = "tutup";
    else { m.status = "buka"; if (!(m.stock > 0)) m.stock = 15; }
    saveMenus(); renderAdmin();
  }
  else if (act === "edit") { editingIx = ix; renderAdmin(); }
  else if (act === "cancel") { editingIx = -1; renderAdmin(); }
  else if (act === "save" && m) {
    const nm = document.getElementById("eMenu").value.trim();
    const hg = parseInt(document.getElementById("eHarga").value) || 0;
    const st = parseInt(document.getElementById("eStok").value);
    if (!nm || !hg) { alert("Nama & harga wajib diisi."); return; }
    m.menu = nm; m.harga = hg;
    if (!isNaN(st) && st >= 0) m.stock = st;
    m.wa = document.getElementById("eWA").value.trim();
    m.desc = document.getElementById("eDesc").value.trim() || nm;
    editingIx = -1; saveMenus(); renderAdmin();
  }
  else if (act === "del" && m) {
    if (!confirm(`Hapus "${m.menu}"?`)) return;
    MENUS.splice(ix, 1); editingIx = -1;
    saveMenus(); renderAdmin();
  }
}

function adminAdd() {
  const g = (id) => document.getElementById(id).value.trim();
  const toko = g("aToko"), penjual = g("aPenjual"), menu = g("aMenu");
  const harga = parseInt(document.getElementById("aHarga").value) || 0;
  const stok = parseInt(document.getElementById("aStok").value);
  const c = document.getElementById("aCat").value;
  const wa = document.getElementById("aWA").value.trim();
  const desc = document.getElementById("aDesc").value.trim() || menu;
  if (!toko || !penjual || !menu || !harga || isNaN(stok) || stok < 0) { alert("Lengkapi semua field admin."); return; }
  MENUS.unshift({ toko, penjual, jam: "08.00–17.00", menu, harga, cat: c, status: "buka", icon: (CAT_ICON[c] || CAT_ICON.makanan)[0], stock: stok, wa, desc });
  ["aToko", "aPenjual", "aMenu", "aHarga", "aStok", "aWA", "aDesc"].forEach((id) => (document.getElementById(id).value = ""));
  saveMenus(); renderAdmin();
}

function renderRekap() {
  let orders = [];
  try { orders = JSON.parse(localStorage.getItem("polijeats_orders")) || []; } catch (e) {}
  const total = orders.reduce((t, o) => t + (o.total || 0), 0);
  document.getElementById("revTotal").textContent = fmt(total);
  document.getElementById("revCount").textContent = orders.length;
  document.getElementById("rekapRows").innerHTML = orders.length
    ? orders.map((o) => {
      const tgl = (o.at || "").slice(0, 10);
      const items = (o.items || []).map((i) => `${i.name} x${i.qty}`).join(", ");
      return `<tr class="border-b"><td class="py-2 text-xs">${tgl}<br><span class="text-gray-400">${o.id || ""}</span></td>`
        + `<td><p class="font-semibold text-xs">${o.buyer || "-"}</p><p class="text-xs text-gray-500">${items}</p></td>`
        + `<td class="text-right font-semibold">${fmt(o.total || 0)}</td></tr>`;
    }).join("")
    : `<tr><td colspan="3" class="py-4 text-center text-sm text-gray-500">Belum ada transaksi.</td></tr>`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (isAdmin()) showPanel();
  document.getElementById("loginBtn").onclick = doLogin;
  document.getElementById("adminPass").onkeydown = (e) => { if (e.key === "Enter") doLogin(); };
  document.getElementById("logoutBtn").onclick = () => {
    sessionStorage.removeItem("polijeats_admin");
    document.getElementById("panelBox").classList.add("hidden");
    document.getElementById("rekapBox").classList.add("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
  };
  document.getElementById("adminRows").addEventListener("click", (e) => {
    const b = e.target.closest("[data-adm]");
    if (!b) return;
    const [act, sIx] = b.dataset.adm.split("|");
    adminAct(act, parseInt(sIx));
  });
  document.getElementById("adminAddBtn").onclick = adminAdd;
});
