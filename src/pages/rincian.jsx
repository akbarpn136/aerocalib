import { lazy } from "solid-js";

export default function HalamanRincian() {
  const DefaultPlotComponent = lazy(() => import("../components/rincian/plot"));
  const DefaultStatsComponent = lazy(() =>
    import("../components/rincian/stats")
  );

  return (
    <div class="space-y-8 h-[calc(100vh-300px)]">
      <DefaultStatsComponent />

      <DefaultPlotComponent />
    </div>
  );
}
