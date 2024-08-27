import "flowbite"
import { onCleanup, onMount } from "solid-js"

import { initDb, closeDb } from "../configs/db"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function Default(props) {
    onMount(async () => {
        await initDb()
    })

    onCleanup(async () => {
        await closeDb()
    })

    return <div class="">
        <Navbar />

        <Sidebar />

        <div class="p-4 sm:ml-64">
            {props.children}
        </div>
    </div>
}
