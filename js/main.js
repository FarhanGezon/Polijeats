document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  document.getElementById("searchInput").oninput = applyFilter;
  document.getElementById("statusFilter").onchange = applyFilter;
  document.querySelectorAll(".tab-btn").forEach((b) => (b.onclick = () => setTab(b)));
  document.querySelector(".tab-btn").classList.add("tab-active");

  document.getElementById("grid").addEventListener("click", (e) => {
    const b = e.target.closest(".tambah-btn");
    if (!b || b.disabled) return;
    addToCart(b.dataset.menu);
  });

  document.getElementById("cartBtn").onclick = () => { renderCart(); openModal("cartModal"); };
  document.getElementById("closeModal").onclick = () => closeModal("cartModal");
  document.getElementById("cartModal").onclick = (e) => { if (e.target.id === "cartModal") closeModal("cartModal"); };
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cart]");
    if (!b) return;
    const [ix, d] = b.dataset.cart.split("|").map(Number);
    chg(ix, d);
  });
  document.getElementById("waBtn").onclick = sendWA;

  document.getElementById("addMenuBtn").onclick = () => openModal("menuModal");
  document.getElementById("closeMenuModal").onclick = () => closeModal("menuModal");
  document.getElementById("menuModal").onclick = (e) => { if (e.target.id === "menuModal") closeModal("menuModal"); };
  document.getElementById("saveMenuBtn").onclick = () => {
    const toko = document.getElementById("fToko").value.trim();
    const penjual = document.getElementById("fPenjual").value.trim();
    const menu = document.getElementById("fMenu").value.trim();
    const harga = parseInt(document.getElementById("fHarga").value) || 0;
    const stok = parseInt(document.getElementById("fStok").value) || 0;
    const c = document.getElementById("fCat").value;
    if (!toko || !penjual || !menu || !harga || stok < 15) { alert("Lengkapi semua field, harga & stok min 15."); return; }
    MENUS.unshift({ toko, penjual, jam: "08.00–17.00", menu, harga, cat: c, status: "buka", stock: stok });
    saveMenus(); renderGrid();
    ["fToko", "fPenjual", "fWA", "fMenu", "fHarga", "fStok"].forEach((id) => (document.getElementById(id).value = ""));
    closeModal("menuModal");
  };
});
