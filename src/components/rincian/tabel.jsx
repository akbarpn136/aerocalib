import { CircleX } from "lucide-solid";
import { useParams, useSearchParams } from "@solidjs/router";
import {
  createEffect,
  createResource,
  useContext,
  Suspense,
  Switch,
  Match,
  For,
} from "solid-js";
import { AppContext } from "../../stores";
import { readSensor } from "../../lib/handlers/sensor";

export default function DefaultTable() {
  const params = useParams();
  const { state } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSensor = async (kegiatanid) => {
    const result = await readSensor({
      db: state.surreal,
      kegiatan: kegiatanid,
    });

    return result;
  };

  const [sensor, { refetch }] = createResource(params.id, fetchSensor);

  createEffect(() => {
    if (state.sensorid) refetch();
  });

  return (
    <div class="pb-5">
      <div class="overflow-x-auto">
        <Suspense fallback={<div class="skeleton h-4 w-full" />}>
          <Switch>
            <Match when={sensor.error}>
              <div role="alert" class="alert alert-error">
                <CircleX size={19} />
                <span>{sensor.error.message}</span>
              </div>
            </Match>

            <Match when={sensor()}>
              <table class="table table-zebra table-xs border">
                <thead>
                  <tr>
                    <th>Run</th>
                    <th>Polar</th>
                    <th>Frekuensi (Hz)</th>
                    <th>V Pitot (m/s)</th>
                    <th>P (Pa)</th>
                    <th>T (°C)</th>
                    <th>H (% rh)</th>
                    <th>Pb (hPa)</th>
                    <th>V Klien ({searchParams.vsatuan})</th>
                    <th>P Klien ({searchParams.psatuan})</th>
                    <th>Dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  <Switch>
                    <Match when={sensor().length > 0}>
                      <For each={sensor()}>
                        {(sen) => (
                          <tr>
                            <th>{sen.run}</th>
                            <th>{sen.polar}</th>
                            <td>{parseFloat(sen.frekuensi)}</td>
                            <td>{parseFloat(sen.vpitot)}</td>
                            <td>{parseFloat(sen.tekanan)}</td>
                            <td>{parseFloat(sen.temperatur)}</td>
                            <td>{parseFloat(sen.kelembapan)}</td>
                            <td>{parseFloat(sen.barometer)}</td>
                            <td>{parseFloat(sen.vklien)}</td>
                            <td>{parseFloat(sen.pklien)}</td>
                            <td>
                              {sen.dibuat.toLocaleString("id-id", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                          </tr>
                        )}
                      </For>
                    </Match>

                    <Match when={sensor().length == 0}>
                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </Match>
                  </Switch>
                </tbody>
              </table>
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
