import { A } from "@solidjs/router"
import { For, Show, Switch, Match, createEffect, createSignal, useContext } from "solid-js"

import { AppContext } from "../stores"
import { produce } from "solid-js/store"
import { cariKegiatan, filterKegiatan } from "../handlers/kegiatan"

export default function HalamanUtama() {
    const limit = Number(import.meta.env.VITE_LIMIT_KEGIATAN)

    const [page, setPage] = createSignal(1)
    const [kosong, setKosong] = createSignal(true)
    const [sebelumnya, setSebelumnya] = createSignal(true)
    const [selanjutnya, setSelanjutnya] = createSignal(true)

    const [kata, setKata] = createSignal("")
    const [pageCari, setPageCari] = createSignal(1)
    const [statusCari, setStatusCari] = createSignal(false)
    const [sebelumnyaCari, setSebelumnyaCari] = createSignal(true)
    const [selanjutnyaCari, setSelanjutnyaCari] = createSignal(true)

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

    const nextPageCari = async () => {
        setPageCari(pageCari() + 1)

        await queryCari(kata(), pageCari(), limit)
    }

    const prevPageCari = async () => {
        if (pageCari() > 1) {
            setPageCari(pageCari() - 1)
        } else {
            setPageCari(1)
        }

        await queryCari(kata(), pageCari(), limit)
    }

    const onFilterKegiatan = async (db, page, limit) => {
        try {
            const hasil = await filterKegiatan(
                db,
                page,
                limit
            )

            setState("kegiatan", [])  // reset empty dulu array
            setState("kegiatan", produce((keg) => {
                hasil.forEach(el => {
                    keg.push(el)
                })
            }))
        } catch (err) {
            throw err
        }
    }

    const queryCari = async (cari, page, limit) => {
        try {
            const pencarian = await cariKegiatan(
                state.surreal,
                page,
                limit,
                cari
            )

            if (pencarian.length > 0) {
                setKosong(false)
                setState("kegiatan", [])  // reset empty dulu array
                setState("kegiatan", produce((keg) => {
                    pencarian.forEach(el => {
                        keg.push(el)
                    })
                }))
            } else {
                setKosong(true)
            }
        } catch (err) {
            throw err
        }
    }

    const onCariPeralatan = async (e) => {
        setKata(e.currentTarget.value)

        if (e.keyCode == 13) {
            setPage(1)
            setPageCari(1)

            if (kata() == "") {
                setStatusCari(false)

                try {
                    await onFilterKegiatan(
                        state.surreal,
                        page(),
                        limit
                    )
                } catch (err) {
                    throw err
                }
            } else {
                setStatusCari(true)

                await queryCari(kata(), pageCari(), limit)
            }
        }
    }

    createEffect(async () => {
        const db = state.surreal

        if (db !== null) {
            try {
                await onFilterKegiatan(db, page(), limit)
            } catch (err) {
                throw err
            }

            if (state.kegiatan.length == 0) {
                setKosong(true)
            } else {
                setKosong(false)
            }

            console.log(state.kegiatan.length)
            if (state.kegiatan.length < limit) {
                setSelanjutnya(false)
                setSelanjutnyaCari(false)
            } else {
                setSelanjutnya(true)
                setSelanjutnyaCari(true)
            }

            if (page() == 1) {
                setSebelumnya(false)
            } else {
                setSebelumnya(true)
            }

            if (pageCari() == 1) {
                setSebelumnyaCari(false)
            } else {
                setSebelumnyaCari(true)
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
                        Opsi
                    </th>
                </tr>
            </thead>
            <tbody>
                <Switch>
                    <Match when={!kosong()}>
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
                    </Match>

                    <Match when={kosong()}>
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                -
                            </th>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                        </tr>
                    </Match>
                </Switch>
            </tbody>
        </table>

        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-4" aria-label="Table navigation">
            <Show when={kosong()}>
                <span class="ms-5 text-sm text-gray-500 dark:text-gray-300">Kegiatan tidak ada.</span>
            </Show>

            <Show when={state.kegiatan.length > 0}>
                <div class="mx-5 bg-white dark:bg-gray-900">
                    <label for="table-search" class="sr-only">Temukan kegiatan...</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Temukan kegiatan..."
                            onKeyUp={onCariPeralatan}
                        />
                    </div>
                </div>
            </Show>

            <Show when={!kosong()}>
                <Switch>
                    <Match when={!statusCari()}>
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 me-5">
                            <Show when={sebelumnya()}>
                                <li>
                                    <button
                                        type="button"
                                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        classList={{
                                            "rounded-s-lg": state.kegiatan.length == limit,
                                            "rounded-lg": state.kegiatan.length < limit
                                        }}
                                        onClick={prevPage}
                                    >
                                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </button>
                                </li>
                            </Show>

                            <Show when={selanjutnya()}>
                                <li>
                                    <button
                                        type="button"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        classList={{
                                            "rounded-e-lg": page() > 1,
                                            "rounded-lg": page() == 1
                                        }}
                                        onClick={nextPage}
                                    >
                                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </li>
                            </Show>
                        </ul>
                    </Match>

                    <Match when={statusCari}>
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 me-5">
                            <Show when={sebelumnyaCari()}>
                                <li>
                                    <button
                                        type="button"
                                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        classList={{
                                            "rounded-s-lg": state.kegiatan.length == limit,
                                            "rounded-lg": state.kegiatan.length < limit
                                        }}
                                        onClick={prevPageCari}
                                    >
                                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </button>
                                </li>
                            </Show>

                            <Show when={selanjutnyaCari()}>
                                <li>
                                    <button
                                        type="button"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        classList={{
                                            "rounded-e-lg": pageCari() > 1,
                                            "rounded-lg": pageCari() == 1
                                        }}
                                        onClick={nextPageCari}
                                    >
                                        <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </li>
                            </Show>
                        </ul>
                    </Match>
                </Switch>
            </Show>
        </nav>
    </div>
}