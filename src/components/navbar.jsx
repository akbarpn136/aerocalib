import { onMount, createSignal } from "solid-js"

import LogoUtama from "./navbar/logo"
import TombolTema from "./navbar/tema"
import TambahKegiatan from "./navbar/kegiatan"


export default function SimpleNavbar() {
    const [toggle, setToggle] = createSignal(false)

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
                    <LogoUtama />
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ms-3">
                        <TambahKegiatan />
                        <TombolTema />
                    </div>
                </div>
            </div>
        </div>
    </nav>
}