import "flowbite"
import { Modal } from "flowbite"
import { createSignal, useContext } from "solid-js"

import { ContextUtama } from "../../stores/utama"

export default function TambahKegiatan() {
    const { state, setState } = useContext(ContextUtama)
    const [statusErr, setStatusErr] = createSignal(false)
    const [pesanErr, setPesanErr] = createSignal("")
    const [nama, setNama] = createSignal("")
    const [deskripsi, setDeskripsi] = createSignal("")

    const onFormKegiatanSubmit = async (e) => {
        e.preventDefault()

        const now = new Date().toLocaleString("sv-SE")
        const { data, error } = await state.supa
            .from("kegiatan")
            .insert({
                nama: nama(),
                deskripsi: deskripsi(),
                created_at: now
            })
            .select()

        if (error) {
            setStatusErr(true)
            setPesanErr(error.message)
        } else {
            const targetEl = document.getElementById("modal-kegiatan")
            const modal = new Modal(targetEl)

            modal.hide()

            setNama("")
            setDeskripsi("")
        }

    }

    return <>
        <button
            type="button"
            data-modal-target="modal-kegiatan"
            data-modal-toggle="modal-kegiatan"
            class="border border-gray-200 dark:border-gray-500 text-gray-700  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-700 dark:focus:ring-gray-500"
        >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
            </svg>
            <span class="sr-only">Tambah kegiatan</span>
        </button>

        <div id="modal-kegiatan" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Kelola kegiatan
                        </h3>
                        <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="modal-kegiatan">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div class="p-4 md:p-5">
                        <form class="space-y-4" onSubmit={onFormKegiatanSubmit}>
                            <div>
                                <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama kegiatan</label>
                                <input
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama mitra kerja" required
                                    value={nama()}
                                    onChange={e => setNama(e.currentTarget.value)}
                                />
                            </div>
                            <div>
                                <label for="deskripsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi (opsional)</label>
                                <textarea
                                    id="message"
                                    rows="2"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan mengenai mitra..."
                                    nama={deskripsi()}
                                    onChange={e => setDeskripsi(e.currentTarget.value)}
                                ></textarea>
                            </div>

                            <button type="submit" class="uppercase w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}