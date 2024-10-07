export const buatSensor = async ({
  db,
  barometer,
  frekuensi,
  kegiatan,
  kelembapan,
  pklien,
  polar,
  psatuan,
  run,
  tekanan,
  temperatur,
  vklien,
  vpitot,
  vsatuan,
}) => {
  const result = await db.query(
    "CREATE sensor SET run = $run, polar = $polar, frekuensi = $frekuensi, vpitot = $vpitot, tekanan = $tekanan, temperatur = $temperatur, kelembapan = $kelembapan, barometer = $barometer, vklien = $vklien, vsatuan = $vsatuan, pklien = $pklien, psatuan = $psatuan, dibuat = time::now(), kegiatan = type::thing('kegiatan', $kegiatan);",
    {
      barometer,
      frekuensi,
      kegiatan,
      kelembapan,
      pklien,
      polar,
      psatuan,
      run,
      tekanan,
      temperatur,
      vklien,
      vpitot,
      vsatuan,
    },
  );

  return result[0];
};
