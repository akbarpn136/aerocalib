import "flowbite"
import { A } from "@solidjs/router"

export default function Sidebar() {
    return <div>
        <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2 font-medium">
                    <li>
                        <A href="/" end class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" activeClass="bg-gray-100 dark:bg-gray-700">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" />
                            </svg>

                            <span class="ms-3">Utama</span>
                        </A>
                    </li>

                    <li>
                        <A href="/arsip" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" activeClass="bg-gray-100 dark:bg-gray-700">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                            </svg>

                            <span class="ms-3">Arsip</span>
                        </A>
                    </li>

                    <li>
                        <A href="/tentang" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" activeClass="bg-gray-100 dark:bg-gray-700">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <span class="ms-3">Tentang</span>
                        </A>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
}