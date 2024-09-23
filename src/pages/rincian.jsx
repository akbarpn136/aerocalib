import DefaultPlot from "../components/rincian/plot";
import DefaultStats from "../components/rincian/stats";

export default function HalamanRincian() {
  return (
    <div class="space-y-8 h-[calc(100vh-210px)]">
      <DefaultStats />
      <DefaultPlot />
    </div>
  );
}
