export const buatKegiatan = async ({ db, peralatan, instansi, kalibrasi }) => {
  const result = await db.query(
    "CREATE sensor SET run = $run, polar = $polar, frekuensi = $frekuensi, vpitot = $vpitot, tekanan = $tekanan, temperatur = $temperatur, kelembapan = $kelembapan, barometer = $barometer, vklien = $vklien, vsatuan = $vsatuan, pklien = $pklien, psatuan = $psatuan, dibuat = time::now(), kegiatan = $kegiatan;",
    {
      barometer: 201,
      frekuensi: 6.32,
      kegiatan: "kegiatan:2n49acum5w9mwcozjmmi",
      kelembapan: 56,
      pklien: 200,
      polar: 1,
      psatuan: "Pa",
      run: 1,
      tekanan: 180,
      temperatur: 30,
      vklien: 0,
      vpitot: 12,
      vsatuan: "m/s",
    },
  );

  return result[0];
};
