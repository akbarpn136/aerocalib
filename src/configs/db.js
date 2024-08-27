import { Surreal } from "surrealdb.js"

const SurrealUrl = import.meta.env.VITE_SURREALDB_URL
const SurrealUser = import.meta.env.VITE_SURREALDB_USER
const SurrealPassword = import.meta.env.VITE_SURREALDB_PASSWORD
const SurrealNamespace = import.meta.env.VITE_SURREALDB_NAMESPACE
const SurrealDatabase = import.meta.env.VITE_SURREALDB_DATABASE

const db = new Surreal()

export const initDb = async () => {
    try {
        await db.connect(SurrealUrl)
        await db.use({ namespace: SurrealNamespace, database: SurrealDatabase })
        await db.signin({
            namespace: SurrealNamespace,
            database: SurrealDatabase,
            username: SurrealUser,
            password: SurrealPassword,
        })

        return db
    } catch (err) {
        console.error("Terjadi kesalahan koneksi ke database:", err)

        throw err
    }
}

export const closeDb = async () => {
    if (!db) return

    await db.close()

    db = undefined
}

export const surreal = () => {
    return db
}