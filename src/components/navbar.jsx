import { A } from "@solidjs/router"
import { Show, Switch, Match, createSignal, onMount, useContext } from "solid-js"

import { ContextUtama } from "../stores/utama"

export default function SimpleNavbar() {
    const { state, setState } = useContext(ContextUtama)

    const [toggle, setToggle] = createSignal(false)
    const [hiddenMuat, setHiddenMuat] = createSignal(false)
    const [loadingMuat, setLoadingMuat] = createSignal(false)
    const [pageKegiatan, setPageKegiatan] = createSignal(1)

    const setTheme = () => {
        const theme = localStorage.getItem("color-theme")

        setToggle(!toggle())
        if (theme === "light") {
            localStorage.setItem("color-theme", "dark")
            document.documentElement.classList.add("dark")
        } else {
            localStorage.setItem("color-theme", "light")
            document.documentElement.classList.remove("dark")
        }
    }

    onMount(() => {
        const theme = localStorage.getItem("color-theme")

        if (theme === "light") {
            setToggle(false)
        } else {
            setToggle(true)
        }
    })

    const onPageKegiatan = async () => {
        setPageKegiatan(pageKegiatan() + 1)
        setLoadingMuat(true)

        try {
            const limit = import.meta.env.VITE_LIMIT_KEGIATAN
            const from = limit * (pageKegiatan() - 1)
            const to = pageKegiatan() * limit - 1

            const { data } = await state.db
                .from("kegiatan")
                .select("id, nama")
                .order("created_at", { ascending: false })
                .range(from, to)

            if (data.length == 0) {
                setHiddenMuat(true)
            } else {
                data.map(kegiatan => {
                    setState("kegiatan", [...state.kegiatan, kegiatan])
                })
            }

            setLoadingMuat(false)
        } catch (err) {
            throw new Error(err)
        }
    }

    return <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span class="sr-only">Buka Pilihan</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                        </svg>
                    </button>
                    <A href="/" end={true} class="flex ms-2 md:me-24">
                        <img src="/logo.svg" class="h-8 me-3" alt="AeroCalib Logo" />
                        <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                            Kalibrasi LA3
                        </span>
                    </A>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ms-3">
                        <button
                            type="button"
                            id="dropdownAksiKegiatan"
                            data-dropdown-toggle="dropdownKegiatan"
                            class="border border-gray-200 dark:border-gray-500 text-gray-700  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-700 dark:focus:ring-gray-500"
                        >
                            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h0" />
                            </svg>
                            <span class="sr-only">Aksi kegiatan</span>
                        </button>

                        <div id="dropdownKegiatan" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                                Opsi Kegiatan
                            </div>
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAksiKegiatan">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Tambah lagi
                                    </a>
                                </li>
                            </ul>

                            <Show when={!hiddenMuat()}>
                                <div class="py-2">
                                    <button
                                        type="button"
                                        class="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={onPageKegiatan}
                                    >
                                        <Show when={loadingMuat()}>
                                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                            </svg>
                                        </Show>
                                        Muat lagi
                                    </button>
                                </div>
                            </Show>
                        </div>

                        <button
                            type="button"
                            class="border border-gray-200 dark:border-gray-500 text-gray-700  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-700 dark:focus:ring-gray-500"
                            onCLick={setTheme}
                        >
                            <Switch>
                                <Match when={!toggle()}>
                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z" />
                                    </svg>
                                </Match>
                                <Match when={toggle()}>
                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                                    </svg>
                                </Match>
                            </Switch>
                            <span class="sr-only">Ganti theme</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
}