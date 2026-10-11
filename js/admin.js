let editingIx = -1;
const isAdmin = () => sessionStorage.getItem("polijeats_admin") === "1";

function showPanel() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("panelBox").classList.remove("hidden");
  document.getElementById("logoutBtn").classList.remove("hidden");
  editingIx = -1;
  renderAdmin();
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
function rowHTML(m, ix) {
  const open = m.status === "buka";
  return `<tr class="border-b"><td class="py-2"><p class="font-semibold">${m.menu}</p><p class="text-xs text-gray-500">${m.toko} • ${m.penjual} • Stok ${m.stock}</p></td>`
    + `<td>${fmt(m.harga)}</td><td>${m.stock}</td>`
    + `<td><button data-adm="toggle|${ix}" class="text-xs font-bold px-2 py-1 rounded ${open ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}">${open ? "BUKA" : "TUTUP"}</button></td>`
    + `<td class="text-right whitespace-nowrap"><button data-adm="edit|${ix}" class="text-xs border rounded px-2 py-1 mr-1">Edit</button><button data-adm="del|${ix}" class="text-xs border border-red-300 text-red-500 rounded px-2 py-1">Hapus</button></td></tr>`;
}
function editRowHTML(m, ix) {
  return `<tr class="border-b bg-sky-50"><td class="py-2"><input id="eMenu" value="${m.menu}" class="border rounded px-2 py-1 text-sm w-full"></td>`
    + `<td><input id="eHarga" type="number" value="${m.harga}" class="border rounded px-2 py-1 text-sm w-24"></td>`
    + `<td><input id="eStok" type="number" value="${m.stock}" class="border rounded px-2 py-1 text-sm w-20"></td>`
    + `<td class="text-xs text-gray-400">${m.status}</td>`
    + `<td class="text-right whitespace-nowrap"><button data-adm="save|${ix}" class="text-xs bg-[#08afe6] text-white rounded px-2 py-1 mr-1">Simpan</button><button data-adm="cancel|x" class="text-xs border rounded px-2 py-1">Batal</button></td></tr>`;
}

function adminAct(act, ix) {
  const m = MENUS[ix];
  if (act === "toggle" && m) { m.status = m.status === "buka" ? "tutup" : "buka"; saveMenus(); renderAdmin(); }
  else if (act === "edit") { editingIx = ix; renderAdmin(); }
  else if (act === "cancel") { editingIx = -1; renderAdmin(); }
  else if (act === "save" && m) {
    const nm = document.getElementById("eMenu").value.trim();
    const hg = parseInt(document.getElementById("eHarga").value) || 0;
    const st = parseInt(document.getElementById("eStok").value);
    if (!nm || !hg) { alert("Nama & harga wajib diisi."); return; }
    m.menu = nm; m.harga = hg;
    if (!isNaN(st) && st >= 0) m.stock = st;
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
  if (!toko || !penjual || !menu || !harga || isNaN(stok) || stok < 0) { alert("Lengkapi semua field admin."); return; }
  MENUS.unshift({ toko, penjual, jam: "08.00–17.00", menu, harga, cat: c, status: "buka", icon: (CAT_ICON[c] || CAT_ICON.makanan)[0], stock: stok });
  ["aToko", "aPenjual", "aMenu", "aHarga", "aStok"].forEach((id) => (document.getElementById(id).value = ""));
  saveMenus(); renderAdmin();
}

document.addEventListener("DOMContentLoaded", () => {
  if (isAdmin()) showPanel();
  document.getElementById("loginBtn").onclick = doLogin;
  document.getElementById("adminPass").onkeydown = (e) => { if (e.key === "Enter") doLogin(); };
  document.getElementById("logoutBtn").onclick = () => {
    sessionStorage.removeItem("polijeats_admin");
    document.getElementById("panelBox").classList.add("hidden");
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
