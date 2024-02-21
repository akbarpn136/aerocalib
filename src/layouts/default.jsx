import "flowbite"
import { onMount } from "solid-js"
import { createStore } from "solid-js/store"

import SimpleNavbar from "../components/navbar"
import SimpleSidebar from "../components/sidebar"
import { StateUtama, ContextUtama } from "../stores/utama"

function DefaultLayout(props) {
    const [state, setState] = createStore(StateUtama)

    onMount(() => {
        if (!localStorage.getItem("color-theme")) {
            localStorage.setItem("color-theme", "light");
        }
    })

    return <ContextUtama.Provider value={{ state, setState }}>
        <SimpleNavbar />

        <SimpleSidebar />

        <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
            {props.children}
            <div class="bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    </ContextUtama.Provider>
}

export default DefaultLayout
