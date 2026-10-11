const LS_KEY = "polijeats_menus_v1";
const DEFAULT_MENUS = [
  { toko: "Warung Bu Ani", penjual: "Bu Ani", jam: "08.00–16.00", menu: "Nasi Goreng Spesial", harga: 12000, cat: "makanan", status: "buka", icon: "🍛", stock: 20 },
  { toko: "Mie Pak Dino", penjual: "Pak Dino", jam: "09.00–17.00", menu: "Mie Ayam Bakso", harga: 10000, cat: "makanan", status: "buka", icon: "🍜", stock: 25 },
  { toko: "Kedai Rina", penjual: "Rina", jam: "10.00–15.00", menu: "Pisang Crispy Coklat", harga: 8000, cat: "snack", status: "tutup", icon: "🍌", stock: 15 },
  { toko: "Teh Siti", penjual: "Siti", jam: "08.00–18.00", menu: "Es Teh Manis Jumbo", harga: 5000, cat: "minuman", status: "buka", icon: "🧋", stock: 30 },
  { toko: "Ayam Bakar Mas Budi", penjual: "Mas Budi", jam: "09.00–17.00", menu: "Ayam Geprek Sambal", harga: 13000, cat: "makanan", status: "buka", icon: "🍗", stock: 20 },
  { toko: "Soto Lamongan Cak Mat", penjual: "Cak Mat", jam: "07.00–15.00", menu: "Soto Ayam Lamongan", harga: 11000, cat: "makanan", status: "buka", icon: "🍲", stock: 18 },
  { toko: "Dapur Minang Uni", penjual: "Uni Desi", jam: "09.00–16.00", menu: "Nasi Padang Rendang", harga: 15000, cat: "makanan", status: "buka", icon: "🍛", stock: 15 },
  { toko: "Bakso Solo Pak Kar", penjual: "Pak Kar", jam: "10.00–18.00", menu: "Bakso Kuah Komplit", harga: 10000, cat: "makanan", status: "tutup", icon: "🍜", stock: 15 },
  { toko: "Kedai Rina", penjual: "Rina", jam: "10.00–15.00", menu: "Risol Mayo isi 3", harga: 6000, cat: "snack", status: "buka", icon: "🥟", stock: 22 },
  { toko: "Tahu Crispy Mbak Lia", penjual: "Mbak Lia", jam: "09.00–17.00", menu: "Tahu Crispy Pedas", harga: 7000, cat: "snack", status: "buka", icon: "🧆", stock: 25 },
  { toko: "Jajanan Kang Deden", penjual: "Kang Deden", jam: "08.00–16.00", menu: "Cireng Isi Ayam", harga: 5000, cat: "snack", status: "buka", icon: "🍘", stock: 30 },
  { toko: "Teh Siti", penjual: "Siti", jam: "08.00–18.00", menu: "Es Jeruk Peras", harga: 6000, cat: "minuman", status: "buka", icon: "🍊", stock: 25 },
  { toko: "Kopi Kampus Mas Eko", penjual: "Mas Eko", jam: "08.00–20.00", menu: "Kopi Susu Gula Aren", harga: 8000, cat: "minuman", status: "buka", icon: "☕", stock: 20 },
  { toko: "Jus Buah Segar Mbak Nin", penjual: "Mbak Nin", jam: "09.00–17.00", menu: "Jus Alpukat Susu", harga: 10000, cat: "minuman", status: "buka", icon: "🥑", stock: 15 },
  { toko: "Martabak Bang Udin", penjual: "Bang Udin", jam: "11.00–19.00", menu: "Martabak Mie Telur", harga: 9000, cat: "makanan", status: "buka", icon: "🥘", stock: 16 },
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
