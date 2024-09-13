import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MonitorCog, Info } from "lucide-solid";

export default function Sidebar() {
  return (
    <aside class="z-10 fixed top-0 left-0 h-screen" aria-label="Sidebar">
      <ul class="menu bg-base-300 h-full rounded-none space-y-1 font-medium">
        <li>
          <A
            href="/"
            end
            class="tooltip tooltip-right"
            data-tip="Kegiatan"
            activeClass="bg-primary text-base-100"
          >
            <MonitorCog size={19} />
          </A>
        </li>

        <li>
          <A
            href="/tentang"
            class="tooltip tooltip-right"
            data-tip="Tentang"
            activeClass="bg-primary text-base-100"
          >
            <Info size={19} />
          </A>
        </li>
      </ul>
    </aside>
  );
}
