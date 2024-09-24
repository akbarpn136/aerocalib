import { MonitorCog } from "lucide-solid";
import { A } from "@solidjs/router";

export default function HalamanKosong() {
  return (
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">🫣 404</h1>

          <p class="py-6">
            Halaman tidak ditemukan. Gunakan tautan di bawah untuk kembali ke
            halaman utama.
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
