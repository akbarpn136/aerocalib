import { Info, ChartScatter, ChartSpline } from "lucide-solid";
import { useParams, useSearchParams } from "@solidjs/router";

export default function DefaultStats() {
  const params = useParams();
  const [searchParam, setSearchParam] = useSearchParams();

  return (
    <div>
      <div class="stats stats-vertical lg:stats-horizontal w-full shadow">
        <div class="stat">
          <div class="stat-figure text-info">
            <Info size={28} />
          </div>
          <div class="stat-title">
            {searchParam.instansi ? searchParam.instansi : "Instansi"}
          </div>
          <div class="stat-value text-wrap">
            {searchParam.peralatan ? searchParam.peralatan : "Peralatan"}
          </div>
          <div class="stat-desc">
            Status: {searchParam.arsip === "false" ? "Aktif" : "Arsip"}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-info">
            <ChartScatter size={28} />
          </div>
          <div class="stat-title">Mean Square Error</div>
          <div class="stat-value">
            {searchParam.mseclient ? searchParam.mseclient : "0.000"}
          </div>
          <div class="stat-desc">
            {searchParam.msela3 ? searchParam.msela3 : "0.000"} (LA3)
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-info">
            <ChartSpline size={28} />
          </div>
          <div class="stat-title">R Squared</div>
          <div class="stat-value">
            {searchParam.r2client ? searchParam.r2client : "0.00"} %
          </div>
          <div class="stat-desc">
            {searchParam.r2la3 ? searchParam.r2la3 : "0.00"} % (LA3)
          </div>
        </div>
      </div>
    </div>
  );
}
