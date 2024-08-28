import { A } from "@solidjs/router"
import { For, createEffect, createSignal, useContext } from "solid-js"

import { AppContext } from "../stores"
import { produce } from "solid-js/store"

export default function HalamanUtama() {
    const [page, setPage] = createSignal(1)

    const { state, setState } = useContext(AppContext)

    const nextPage = () => {
        setPage(page() + 1)
    }

    const prevPage = () => {
        if (page() > 1) {
            setPage(page() - 1)
        } else {
            setPage(1)
        }
    }

    createEffect(async () => {
        const db = state.surreal

        if (db !== null) {
            const limit = Number(import.meta.env.VITE_LIMIT_KEGIATAN)

            try {
                const result = await db.query(
                    "SELECT id, peralatan, instansi, dibuat FROM kegiatan WHERE arsip = false ORDER BY dibuat LIMIT $limit START ($page - 1) * $limit;",
                    {page: page(), limit}
                )

                setState("kegiatan", [])  // reset empty dulu array
                setState("kegiatan", produce((keg) => {
                    result[0].forEach(el => {
                        keg.push(el)
                    })
                }))
            } catch (err) {
                throw err
            }
        }
    })

    return <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Peralatan
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Instansi
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Dibuat
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <For each={state.kegiatan}>{(item, index) => {
                    return <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.peralatan}
                        </th>
                        <td class="px-6 py-4">
                            {item.instansi}
                        </td>
                        <td class="px-6 py-4">
                            {
                                item.dibuat.toLocaleString("id-id", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }
                        </td>
                        <td class="px-6 py-4">
                            <A href={`${item.id.id}/rincian`} class="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-tablet-view hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                                </svg>
                            </A>
                        </td>
                    </tr>
                }}</For>
            </tbody>
        </table>

        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-4" aria-label="Table navigation">
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 ms-5">
                <li>
                    <button
                        type="button"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={prevPage}
                    >
                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={nextPage}
                    >
                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
}