function generateInsertStatements(nama_barang, id_awal, harga_awal, harga_akhir, kenaikan) {
  const id_barang_prefix = "BR";
  const id_kategori = 8;
  const merk = "Apple";
  const harga_beli = 0;
  const satuan_barang = "PCS";
  const stok = 100;
  const tgl_input = "2024-09-30 09:00:00";

  const insertStatements = [];
  let current_harga = harga_awal;
  let id = id_awal;

  while (current_harga <= harga_akhir) {
    const id_barang = `${id_barang_prefix}${String(id).padStart(3, '0')}`;
    const statement = `(${id}, '${id_barang}', ${id_kategori}, '${nama_barang}', '${merk}', ${harga_beli}, ${current_harga}, '${satuan_barang}', ${stok}, '${tgl_input}', NULL)`;
    insertStatements.push(statement);

    id++;
    current_harga += kenaikan;
  }

  return insertStatements.join(",\n");
}

// Menginput data dari user
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Masukkan nama barang: ', (nama_barang) => {
  readline.question('Masukkan ID awal: ', (id_awal) => {
    const harga_awal = 10000;
    const harga_akhir = 65000;
    const kenaikan = 5000;

    const insertStatements = generateInsertStatements(nama_barang, parseInt(id_awal), harga_awal, harga_akhir, kenaikan);

    console.log("\nINSERT INTO `barang` (`id`, `id_barang`, `id_kategori`, `nama_barang`, `merk`, `harga_beli`, `harga_jual`, `satuan_barang`, `stok`, `tgl_input`, `tgl_update`) VALUES");
    console.log(insertStatements + ";");

    readline.close();
  });
});
