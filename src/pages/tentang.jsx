import { MonitorCog } from "lucide-solid";
import { A } from "@solidjs/router";

export default function HalamanTentang() {
  return (
    <div class="hero bg-base-100 h-[calc(100vh-64px)]">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">AeroCalib LA3</h1>

          <p class="py-6">
            Aplikasi ini berfungsi untuk membantu dalam pelaksanaan kalibrasi
            peralatan laboratorium. Aplikasi dikembangkan menggunakan teknologi{" "}
            <i>Open Source</i> sehingga tidak memerlukan lisensi tambahan dalam
            pemanfaatan AeroCalib 🚀.
          </p>

          <A href="/" class="btn btn-primary">
            <MonitorCog size={19} />
            Utama
          </A>
        </div>
      </div>
    </div>
  );
}
