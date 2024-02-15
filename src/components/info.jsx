import { A } from "@solidjs/router"

export function InfoUmum() {
    return <div class="flex h-screen">
        <div class="py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
            <A href="/info" class="mt-14 inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span>
                <span class="text-sm font-medium">Yuk mampir, untuk mengenal tentang aplikasi ini</span>
                <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
            </A>
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Aplikasi kalibrasi peralatan pengujian
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                Silahkan pilih daftar kegiatan yang ditampilkan pada menu samping untuk melihat
                rincian dari masng-masing kegiatan kalibrasi...🙏🏼
            </p>
        </div>
    </div>
}

export function Info404() {
    return <div class="flex h-screen">
        <div class="py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
            <A href="/" class="mt-14 inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-red-700 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800">
                <span class="text-xs bg-red-600 rounded-full text-white px-4 py-1.5 me-3">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h0m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span>
                <span class="text-sm font-medium">Kembali ke halaman utama</span>
                <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
            </A>
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                ❌ 404 Tidak Ditemukan
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                Maaf, halaman yang Anda cari tidak ditemukan. Untuk itu silahkan kembali ke halaman
                utama melalui tautan di atas.
            </p>
        </div>
    </div>
}