const LS_KEY = "polijeats_menu";
const DEFAULT_MENUS = [
  { toko: "Warung Bu Ani", penjual: "Bu Ani", jam: "08.00–16.00", menu: "Nasi Goreng Spesial", desc: "Nasi goreng telur + ayam suwir, kerupuk, dan acar. Porsi jumbo.", wa: "081234500001", harga: 12000, cat: "makanan", status: "buka", icon: "🍛", stock: 20 },
  { toko: "Mie Pak Dino", penjual: "Pak Dino", jam: "09.00–17.00", menu: "Mie Ayam Bakso", desc: "Mie ayam gurih + 3 bakso sapi, pangsit goreng, dan sawi.", wa: "081234500002", harga: 10000, cat: "makanan", status: "buka", icon: "🍜", stock: 25 },
  { toko: "Kedai Rina", penjual: "Rina", jam: "10.00–15.00", menu: "Pisang Crispy Coklat", desc: "Pisang crispy topping coklat meses + keju, isi 5 potong.", wa: "081234500003", harga: 8000, cat: "snack", status: "tutup", icon: "🍌", stock: 15 },
  { toko: "Teh Siti", penjual: "Siti", jam: "08.00–18.00", menu: "Es Teh Manis Jumbo", desc: "Teh manis dingin gula asli, gelas jumbo 500ml.", wa: "081234500004", harga: 5000, cat: "minuman", status: "buka", icon: "🧋", stock: 30 },
  { toko: "Ayam Bakar Mas Budi", penjual: "Mas Budi", jam: "09.00–17.00", menu: "Ayam Geprek Sambal", desc: "Ayam crispy digeprek + sambal bawang, lalapan, nasi hangat.", wa: "081234500005", harga: 13000, cat: "makanan", status: "buka", icon: "🍗", stock: 20 },
  { toko: "Soto Lamongan Cak Mat", penjual: "Cak Mat", jam: "07.00–15.00", menu: "Soto Ayam Lamongan", desc: "Soto kuning + suwiran ayam, telur, koya, jeruk nipis.", wa: "081234500006", harga: 11000, cat: "makanan", status: "buka", icon: "🍲", stock: 18 },
  { toko: "Dapur Minang Uni", penjual: "Uni Desi", jam: "09.00–16.00", menu: "Nasi Padang Rendang", desc: "Nasi + rendang sapi empuk, sayur singkong, sambal ijo.", wa: "081234500007", harga: 15000, cat: "makanan", status: "buka", icon: "🍛", stock: 15 },
  { toko: "Bakso Solo Pak Kar", penjual: "Pak Kar", jam: "10.00–18.00", menu: "Bakso Kuah Komplit", desc: "Bakso sapi + tahu, mie, bihun, kuah kaldu gurih.", wa: "081234500008", harga: 10000, cat: "makanan", status: "tutup", icon: "🍜", stock: 15 },
  { toko: "Kedai Rina", penjual: "Rina", jam: "10.00–15.00", menu: "Risol Mayo isi 3", desc: "Risol goreng isi mayo + sosis, isi 3 pcs + saus.", wa: "081234500009", harga: 6000, cat: "snack", status: "buka", icon: "🥟", stock: 22 },
  { toko: "Tahu Crispy Mbak Lia", penjual: "Mbak Lia", jam: "09.00–17.00", menu: "Tahu Crispy Pedas", desc: "Tahu crispy bumbu balado pedas manis, isi 8 potong.", wa: "081234500010", harga: 7000, cat: "snack", status: "buka", icon: "🧆", stock: 25 },
  { toko: "Jajanan Kang Deden", penjual: "Kang Deden", jam: "08.00–16.00", menu: "Cireng Isi Ayam", desc: "Cireng goreng isi ayam suwir pedas, isi 5 pcs.", wa: "081234500011", harga: 5000, cat: "snack", status: "buka", icon: "🍘", stock: 30 },
  { toko: "Teh Siti", penjual: "Siti", jam: "08.00–18.00", menu: "Es Jeruk Peras", desc: "Jeruk peras asli + es batu, segar tanpa pengawet.", wa: "081234500012", harga: 6000, cat: "minuman", status: "buka", icon: "🍊", stock: 25 },
  { toko: "Kopi Kampus Mas Eko", penjual: "Mas Eko", jam: "08.00–20.00", menu: "Kopi Susu Gula Aren", desc: "Espresso + susu fresh + gula aren, cup 250ml.", wa: "081234500013", harga: 8000, cat: "minuman", status: "buka", icon: "☕", stock: 20 },
  { toko: "Jus Buah Segar Mbak Nin", penjual: "Mbak Nin", jam: "09.00–17.00", menu: "Jus Alpukat Susu", desc: "Alpukat mentega + susu coklat, kental dan creamy.", wa: "081234500014", harga: 10000, cat: "minuman", status: "buka", icon: "🥑", stock: 15 },
  { toko: "Martabak Bang Udin", penjual: "Bang Udin", jam: "11.00–19.00", menu: "Martabak Mie Telur", desc: "Martabak mie + 2 telur, kornet, dan acar timun.", wa: "081234500015", harga: 9000, cat: "makanan", status: "buka", icon: "🥘", stock: 16 },
];

// ponytail: localStorage single-device; upgrade ke DB/API saat multi-admin.
function loadMenus() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) { const a = JSON.parse(raw); if (Array.isArray(a) && a.length) return a; }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_MENUS));
}
let MENUS = loadMenus();
function saveMenus() { try { localStorage.setItem(LS_KEY, JSON.stringify(MENUS)); } catch (e) {} }