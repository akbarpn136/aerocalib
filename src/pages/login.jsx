import { createSignal, useContext, onMount, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"

import { ContextUtama } from "../stores/utama"


export default function HalamanLogin() {
    const goto = useNavigate()
    const [email, setEmail] = createSignal("")
    const [sandi, setSandi] = createSignal("")
    const [pesan, setPesan] = createSignal("")
    const [lihat, setLihat] = createSignal(false)
    const { state } = useContext(ContextUtama)

    onMount(async () => {
        const { data } = await state.supa.auth.getSession()

        if (data.session) {
            goto(-1, { replace: true })
        }
    })

    const onFormAutentikasiSubmit = async (e) => {
        e.preventDefault()
        setLihat(false)

        let { error } = await state.supa.auth.signInWithPassword({
            email: email(),
            password: sandi()
        })

        if (error) {
            setPesan(error.message)
            setLihat(true)
        } else {
            setLihat(false)
            goto("/", { replace: false })
        }
    }

    return <div class="m-auto w-full md:w-96 p-2 z-10 relative">
        <div class="p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" onSubmit={onFormAutentikasiSubmit}>
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                    🔐 Silahkan autentikasi dulu
                </h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email"
                        value={email()}
                        onChange={e => setEmail(e.currentTarget.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kata sandi</label>
                    <input type="password" name="password" id="password"
                        placeholder="••••••••"
                        value={sandi()}
                        onChange={e => setSandi(e.currentTarget.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button type="submit"
                    class="w-full text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Masuk
                </button>
                <button type="button"
                    onClick={() => goto("/")}
                    class="uppercase w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Batal
                </button>
            </form>
        </div>

        <Show when={lihat()}>
            <div id="toast-warning" class="fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    </svg>
                    <span class="sr-only">Warning icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">{pesan()}</div>
                <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Close"
                    onClick={() => setLihat(false)}
                    data-dismiss-target="#toast-warning"
                >
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </Show>
    </div>
}