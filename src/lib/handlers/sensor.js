export const buatKegiatan = async ({ db, peralatan, instansi, kalibrasi }) => {
  const result = await db.query("CREATE sensor SET , dibuat = time::now();", {
    peralatan,
    instansi,
    kalibrasi,
  });

  return result[0];
};
