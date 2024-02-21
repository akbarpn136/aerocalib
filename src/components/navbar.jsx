import { A } from "@solidjs/router"
import { Switch, Match, createSignal, onMount } from "solid-js"

export default function SimpleNavbar() {
    const [toggle, setToggle] = createSignal(false)

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