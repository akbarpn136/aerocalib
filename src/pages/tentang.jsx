// import { A } from "@solidjs/router"

export default function HalamanTentang() {
  return (
    <section class="flex h-screen -mt-20">
      <div class="py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          AeroCalib LA3
        </h1>

        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Aplikasi ini berfungsi untuk membantu dalam pelaksanaan kalibrasi
          peralatan laboratorium. Aplikasi dikembangkan menggunakan teknologi{" "}
          <i>Open Source</i> sehingga tidak memerlukan lisensi tambahan dalam
          pemanfaatan AeroCalib 🚀.
        </p>

        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="/"
            class="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
          >
            <svg
              class="w-5 h-5 text-gray-500 me-2 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
              />
            </svg>
            Utama
          </a>
        </div>
      </div>
    </section>
  );
}
