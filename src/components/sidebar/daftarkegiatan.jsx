import { For, Show, onMount, useContext, createResource } from "solid-js"
import { A } from "@solidjs/router"

import SkeletonKegiatan from "./skeletonkegiatan"
import { ContextUtama } from "../../stores/utama"

export default function DaftarKegiatan() {
    const { state, setState } = useContext(ContextUtama)

    const getKegiatan = async () => {
        try {
            const { data } = await state.db
                .from("kegiatan")
                .select("id, nama")
                .limit(import.meta.env.VITE_LIMIT_KEGIATAN)
                .order("created_at", { ascending: false })

            data.map(kegiatan => {
                setState("kegiatan", [...state.kegiatan, kegiatan])
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    onMount(() => {
        setState("kegiatan", [])
        createResource(getKegiatan)
    })

    return <Show when={state.kegiatan.length != 0} fallback={<SkeletonKegiatan />}>
        <ul class="space-y-2 font-medium">
            <For each={state.kegiatan}>
                {item => <li>
                    <A activeClass="link-active"
                        href={`/kegiatan/${item.id}`} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h0" />
                        </svg>
                        <span class="ml-3">{item.nama}</span>
                    </A>
                </li>}
            </For>
        </ul>
    </Show>
}