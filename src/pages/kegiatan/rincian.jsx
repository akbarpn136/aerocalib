import { onMount, useContext } from "solid-js"
import { useNavigate } from "@solidjs/router"

import { ContextUtama } from "../../stores/utama"

export default function RincianKegiatan() {
    const { state } = useContext(ContextUtama)
    const navigate = useNavigate()

    onMount(async () => {
        const { data } = await state.supa.auth.getSession()

        if (!data.session) {
            navigate("/login", { replace: true })
        }
    })

    return <div class="h-screen p-4 sm:ml-64">
        <div class="p-4 mt-14">
            <p class="text-gray-500 dark:text-gray-200">INI HALAMAN RINCIAN KEGIATAN.</p>
        </div>
    </div >
}