import { createContext } from "solid-js"
import { createClient } from "@supabase/supabase-js"

export const ContextUtama = createContext()

export const StateUtama = {
    db: createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
    ),
    kegiatan: []
}