const fs = require('fs');
function generateInsertStatements(nama_barang, id_awal, harga_awal, harga_akhir, kenaikan) {
  const id_barang_prefix = "BR";
  const id_kategori = 9;
  const merk = "Redmi (TG)";
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

// Pertama, meminta input untuk nama barang dan ID awal
readline.question('Masukkan nama barang (pisahkan dengan koma): ', (input) => {
  const items = input.split(',').map(item => item.trim());

  readline.question('Masukkan ID awal: ', (id_awal) => {
    const harga_awal = 15000; // Harga mulai
    const harga_akhir = 45000; // Harga akhir
    const kenaikan = 5000; // Kenaikan harga
    
    const insertStatements = [];
    let id = parseInt(id_awal); // Menggunakan ID awal dari input

    items.forEach(nama_barang => {
      // Generate insert statements untuk setiap nama barang
      const statements = generateInsertStatements(nama_barang.trim(), id, harga_awal, harga_akhir, kenaikan);
      insertStatements.push(statements);
      
      // Update ID untuk item berikutnya
      id += Math.floor((harga_akhir - harga_awal) / kenaikan) + 1; // Update ID untuk setiap barang
    });

    let out_header = "\nINSERT INTO `barang` (`id`, `id_barang`, `id_kategori`, `nama_barang`, `merk`, `harga_beli`, `harga_jual`, `satuan_barang`, `stok`, `tgl_input`, `tgl_update`) VALUES\n"
    console.log("\nINSERT INTO `barang` (`id`, `id_barang`, `id_kategori`, `nama_barang`, `merk`, `harga_beli`, `harga_jual`, `satuan_barang`, `stok`, `tgl_input`, `tgl_update`) VALUES");
    console.log(insertStatements.join(",\n") + ";");

    fs.writeFileSync("output.txt", insertStatements.join(",\n") + ";")

    readline.close();
  });
});
