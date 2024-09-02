export const cariKegiatan = async (db, page, limit, cari) => {
    try {
        const result = await db.query(
            "SELECT id, peralatan, instansi, dibuat, search::score(1) AS score_peralatan, search::score(2) AS score_instansi FROM kegiatan WHERE peralatan @1@ $cari OR instansi @2@ $cari ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
            { page, limit, cari }
        )

        return result[0]
    } catch (err) {
        throw err
    }
}

export const filterKegiatan = async (db, page, limit) => {
    try {
        const result = await db.query(
            "SELECT id, peralatan, instansi, dibuat FROM kegiatan WHERE arsip = false ORDER BY dibuat DESC LIMIT $limit START ($page - 1) * $limit;",
            { page, limit }
        )

        return result[0]
    } catch (err) {
        throw err
    }
}