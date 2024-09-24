import { lazy } from "solid-js";

export default function HalamanRincian() {
  const DefaultPlotComponent = lazy(() => import("../components/rincian/plot"));
  const DefaultStatsComponent = lazy(() =>
    import("../components/rincian/stats")
  );

  return (
    <div class="space-y-8 h-[calc(100vh-505px)] md:h-[calc(100vh-230px)]">
      <DefaultStatsComponent />

      <DefaultPlotComponent />
    </div>
  );
}
