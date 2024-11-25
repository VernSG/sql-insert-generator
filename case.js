const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateInsertStatements(
  nama_barang,
  id_awal,
  harga_awal,
  harga_akhir,
  kenaikan
) {
  const id_barang_prefix = "CAS";
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
    const id_barang = `${id_barang_prefix}${String(id).padStart(3, "0")}`;
    const nama_barang_final = `${nama_barang} ${getDeskripsiBarang(
      current_harga,
      merk,
      nama_barang
    )}`;
    const statement = `(${id}, '${id_barang}', ${id_kategori}, '${nama_barang_final}', '${merk}', ${harga_beli}, ${current_harga}, '${satuan_barang}', ${stok}, '${tgl_input}', NULL)`;

    insertStatements.push(statement);
    id++;
    current_harga += kenaikan;
  }

  return insertStatements.join(",\n");
}

function getDeskripsiBarang(harga, merk, nama_barang) {
  if (harga === 10000 || harga === 15000) return "Bening";
  if (harga === 20000) return "Hard case";
  if (harga === 25000 || harga === 30000) return "Pro Camera";
  if (harga === 35000) return "Motif bening tipis";
  if (harga === 40000) return "Motif";
  if (harga === 45000) return "Motif bening tebal";
  if (harga === 50000) return "Robot";

  if (harga === 55000 && merk.toLowerCase() !== "apple") return "Hybrid";

  // Ekstrak angka dari nama barang dengan validasi
  const modelNumberMatch = nama_barang.match(/\d+/); // Ambil angka pertama dari string
  const modelNumber = modelNumberMatch ? parseInt(modelNumberMatch[0], 10) : 0;

  if (harga === 55000 && merk.toLowerCase() === "apple" && modelNumber < 11)
    return "Hybrid";
  if (
    (harga === 60000 || harga === 65000) &&
    merk.toLowerCase() === "apple" &&
    modelNumber > 10
  )
    return "Hybrid";
  if ((harga === 60000 || harga === 65000) && merk.toLowerCase() !== "apple")
    return "Dompet";

  return "";
}

// Input dari pengguna
readline.question("Masukkan nama barang: ", (nama_barang) => {
  readline.question("Masukkan ID awal (angka): ", (id_awal) => {
    if (isNaN(id_awal)) {
      console.error("ID awal harus berupa angka.");
      readline.close();
      return;
    }

    const harga_awal = 10000;
    const harga_akhir = 65000;
    const kenaikan = 5000;

    const insertStatements = generateInsertStatements(
      nama_barang,
      parseInt(id_awal),
      harga_awal,
      harga_akhir,
      kenaikan
    );

    console.log(
      "\nINSERT INTO `barang` (`id`, `id_barang`, `id_kategori`, `nama_barang`, `merk`, `harga_beli`, `harga_jual`, `satuan_barang`, `stok`, `tgl_input`, `tgl_update`) VALUES"
    );
    console.log(insertStatements + ";");

    readline.close();
  });
});
