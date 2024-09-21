import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MonitorCog, Info } from "lucide-solid";

export default function Sidebar() {
  return (
    <aside class="z-10 fixed top-0 left-0 h-screen" aria-label="Sidebar">
      <ul class="menu bg-base-300 h-full rounded-none space-y-2 font-medium">
        <li class="tooltip tooltip-right" data-tip="Kegiatan">
          <A href="/" end class="btn" activeClass="btn-primary">
            <MonitorCog size={19} />
          </A>
        </li>

        <li class="tooltip tooltip-right" data-tip="Tentang">
          <A href="/tentang" class="btn" activeClass="btn-primary">
            <Info size={19} />
          </A>
        </li>
      </ul>
    </aside>
  );
}
