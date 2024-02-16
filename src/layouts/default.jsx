import "flowbite"
import { onMount } from "solid-js"

import SimpleNavbar from "../components/navbar"
import SimpleSidebar from "../components/sidebar"

function DefaultLayout(props) {
    onMount(() => {
        if (!localStorage.getItem("color-theme")) {
            localStorage.setItem("color-theme", "light");
        }
    })

    return <>
        <SimpleNavbar />

        <SimpleSidebar />

        <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
            {props.children}
            <div class="bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    </>
}

export default DefaultLayout
