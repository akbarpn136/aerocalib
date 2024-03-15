import { Switch, Match, createSignal } from "solid-js"

export default function TombolTema() {
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

    return <button
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
}