import { lazy } from "solid-js";

export default function HalamanRincian() {
  const DefaultPlotComponent = lazy(() => import("../components/rincian/plot"));
  const DefaultStatsComponent = lazy(() =>
    import("../components/rincian/stats")
  );
  const DefaultTableComponent = lazy(() =>
    import("../components/rincian/tabel")
  );
  const OlahSensorComponent = lazy(() => import("../components/rincian/olah"));

  return (
    <div class="space-y-8 h-[calc(100vh-505px)] md:h-[calc(100vh-230px)]">
      <DefaultStatsComponent />

      <DefaultPlotComponent />

      <DefaultTableComponent />

      <dialog id="modal_olah_sensor" class="modal">
        <div class="modal-box w-11/12 max-w-5xl space-y-6">
          <h3 class="text-lg font-bold">Olah Data Kalibrasi</h3>

          <OlahSensorComponent />
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
