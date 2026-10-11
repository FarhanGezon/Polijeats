document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  document.getElementById("searchInput").oninput = applyFilter;
  document.getElementById("statusFilter").onchange = applyFilter;
  document.querySelectorAll(".tab-btn").forEach((b) => (b.onclick = () => setTab(b)));
  document.querySelector(".tab-btn").classList.add("tab-active");

  document.getElementById("grid").addEventListener("click", (e) => {
    const b = e.target.closest(".tambah-btn");
    if (b) { if (!b.disabled) addToCart(b.dataset.menu); return; }
    const card = e.target.closest(".card");
    if (card) openDetail(card.dataset.menu);
  });
  document.getElementById("closeDetail").onclick = () => closeModal("detailModal");
  document.getElementById("detailModal").onclick = (e) => { if (e.target.id === "detailModal") closeModal("detailModal"); };
  document.getElementById("dAddBtn").onclick = (e) => { closeModal("detailModal"); addToCart(e.target.dataset.menu); };

  document.getElementById("cartBtn").onclick = () => { renderCart(); openModal("cartModal"); };
  document.getElementById("closeModal").onclick = () => closeModal("cartModal");
  document.getElementById("cartModal").onclick = (e) => { if (e.target.id === "cartModal") closeModal("cartModal"); };
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cart]");
    if (!b) return;
    const [ix, d] = b.dataset.cart.split("|").map(Number);
    chg(ix, d);
  });
  document.getElementById("checkoutBtn").onclick = openPay;
  document.getElementById("closePay").onclick = () => closeModal("payModal");
  document.getElementById("payModal").onclick = (e) => { if (e.target.id === "payModal") closeModal("payModal"); };
  document.getElementById("payDoneBtn").onclick = completePay;
  document.getElementById("payCloseBtn").onclick = () => closeModal("payModal");

});
