export const buatKegiatan = async ({db, peralatan, instansi}) => {
  const result = await db.query(
    "CREATE kegiatan SET peralatan = $peralatan, instansi = $instansi, dibuat = time::now(), arsip = false;",
    { peralatan, instansi }
  )

  return result[0]
}

export const filterKegiatan = async (db, page, limit, arsip=false) => {
  const result = await db.query(
    "SELECT id, peralatan, instansi, dibuat FROM kegiatan WHERE arsip = $arsip ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
    { page, limit, arsip }
  )

  return result[0]
}

export const cariKegiatan = async (db, page, limit, cari, arsip=false) => {
  const result = await db.query(
    "SELECT id, peralatan, instansi, dibuat, search::score(1) AS score_peralatan, search::score(2) AS score_instansi FROM kegiatan WHERE arsip = $arsip AND peralatan @1@ $cari OR instansi @2@ $cari ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
    { page, limit, cari, arsip }
  )

  return result[0]
}

export const filterKegiatanId = async (db, id) => {
  const result = await db.query("SELECT * FROM kegiatan WHERE id = $id;", { id })

  return result[0]
}

export const updateKegiatan = async ({db, id, peralatan, instansi}) => {
  const result = await db.query(`UPDATE kegiatan:${id} SET peralatan = $peralatan, instansi = $instansi;`, { peralatan, instansi })

  return result[0]
}