import "flowbite"
import { onCleanup, onMount, ErrorBoundary, createSignal, Show } from "solid-js"

import { initDb, closeDb } from "../configs/db"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import ToastSalah from "../components/toast/salah"

export default function Default(props) {
    const [salah, setSalah] = createSignal(false)
    const [pesan, setPesan] = createSignal("")

    onMount(async () => {
        try {
            await initDb()
        } catch (err) {
            setPesan(err.message)
            setSalah(true)
        }
    })

    onCleanup(async () => {
        await closeDb()
    })

    return <div class="">
        <Navbar />

        <Sidebar />

        <div class="p-4 sm:ml-64">
            <Show when={salah()}>
                <ToastSalah pesan={pesan()} />
            </Show>

            <ErrorBoundary fallback={(err) => <ToastSalah pesan={err.message} />}>
                {props.children}
            </ErrorBoundary>
        </div>
    </div>
}
