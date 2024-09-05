export const buatKegiatan = async (db, {peralatan, instansi}) => {
    try {
        const result = await db.query(
            "CREATE kegiatan SET peralatan = $peralatan, instansi = $instansi, dibuat = time::now(), arsip = false;",
            { peralatan, instansi }
        )

        return result[0]
    } catch (err) {
        throw err
    }
}

export const filterKegiatan = async (db, page, limit, arsip=false) => {
    try {
        const result = await db.query(
            "SELECT id, peralatan, instansi, dibuat FROM kegiatan WHERE arsip = $arsip ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
            { page, limit, arsip }
        )

        return result[0]
    } catch (err) {
        throw err
    }
}

export const cariKegiatan = async (db, page, limit, cari, arsip=false) => {
    try {
        const result = await db.query(
            "SELECT id, peralatan, instansi, dibuat, search::score(1) AS score_peralatan, search::score(2) AS score_instansi FROM kegiatan WHERE arsip = $arsip AND peralatan @1@ $cari OR instansi @2@ $cari ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
            { page, limit, cari, arsip }
        )

        return result[0]
    } catch (err) {
        throw err
    }
}