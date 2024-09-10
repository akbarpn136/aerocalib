import "flowbite";
import { A } from "@solidjs/router";
import { MonitorCog, Info } from "lucide-solid";

export default function Sidebar() {
  return (
    <div>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-30 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <A
                href="/"
                end
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                activeClass="bg-gray-100 dark:bg-gray-700"
              >
                <MonitorCog size={19} />

                <span class="ms-3">Kegiatan</span>
              </A>
            </li>

            <li>
              <A
                href="/tentang"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                activeClass="bg-gray-100 dark:bg-gray-700"
              >
                <Info size={19} />

                <span class="ms-3">Tentang</span>
              </A>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
