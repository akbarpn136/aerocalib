export const buatSensor = async ({
  db,
  barometer,
  frekuensi,
  kegiatan,
  kelembapan,
  pklien,
  polar,
  run,
  tekanan,
  temperatur,
  vklien,
  vpitot,
}) => {
  const result = await db.query(
    "CREATE sensor SET run = $run, polar = $polar, frekuensi = $frekuensi, vpitot = $vpitot, tekanan = $tekanan, temperatur = $temperatur, kelembapan = $kelembapan, barometer = $barometer, vklien = $vklien, pklien = $pklien, dibuat = time::now(), kegiatan = type::thing('kegiatan', $kegiatan);",
    {
      barometer,
      frekuensi,
      kegiatan,
      kelembapan,
      pklien,
      polar,
      run,
      tekanan,
      temperatur,
      vklien,
      vpitot,
    },
  );

  return result[0];
};

export const readSensor = async ({ db, kegiatan }) => {
  const result = await db.query("SELECT * FROM sensor WHERE kegiatan = type::thing('kegiatan', $kegiatan) ORDER BY dibuat;", {
    kegiatan
  })

  return result[0]
}
