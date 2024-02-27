export default function HalamanUtama() {
    return <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
        <div class="flex h-screen">
            <div class="m-auto w-full md:w-96 p-2 z-10 relative">
                <div class="p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form class="space-y-6" action="#">
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                            🔐 Silahkan autentikasi dulu
                        </h5>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kata sandi</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <button type="submit" class="w-full text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Masuk
                        </button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Belum daftar? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">
                                Bikin akun
                            </a> atau <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                lupa sandi?
                            </a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <div class="bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
}