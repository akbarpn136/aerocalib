import {
  Match,
  Switch,
  onCleanup,
  useContext,
  createEffect,
  createResource,
} from "solid-js";
import Plotly from "plotly.js-dist-min";
import { useParams, useSearchParams } from "@solidjs/router";

import { AppContext } from "../../stores";
import { readSensor } from "../../lib/handlers/sensor";

export default function DefaultPlot() {
  let plot1;
  let plot2;
  let plot3;
  let plot4;

  const params = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useContext(AppContext);

  const initlayout = {
    responsive: true,
    showlegend: false,
    legend: { orientation: "v" },
    paper_bgcolor: "#eceff4",
    plot_bgcolor: "#eceff4",
    margin: { l: 65, r: 65, b: 75, t: 50, pad: 10 },
    height: 320,
  };

  const configs = {
    responsive: true,
    scrollZoom: false,
    displayModeBar: false,
    displaylogo: false,
  };

  const fetchSensor = async (kegiatanid) => {
    const result = await readSensor({
      db: state.surreal,
      kegiatan: kegiatanid,
    });

    const groupByRun = Object.groupBy(result, ({ run }) => run);

    for (const [, grouprun] of Object.entries(groupByRun)) {
      const groupByPolar = Object.groupBy(grouprun, ({ polar }) => polar);

      for (const [, grouppolar] of Object.entries(groupByPolar)) {
        console.log(grouppolar);
        // grouppolar.forEach((trace) => {
        //   console.log(trace);
        // });
      }
    }

    const trace1 = {
      x: [],
      y: [],
      name: "LA3",
      type: "scatter",
      mode: "markers",
    };

    const frekuensi = result.map((sensor) => {
      return parseFloat(sensor.frekuensi);
    });

    const tekanan = result.map((sensor) => {
      return parseFloat(sensor.tekanan);
    });

    const pklien = result.map((sensor) => {
      return parseFloat(sensor.pklien);
    });

    const vpitot = result.map((sensor) => {
      return parseFloat(sensor.vpitot);
    });

    const vklien = result.map((sensor) => {
      return parseFloat(sensor.vklien);
    });

    return result;
  };

  const [, { refetch }] = createResource(params.id, fetchSensor);

  onCleanup(() => {
    Plotly.purge(plot1);
  });

  createEffect(() => {
    const jenis_kalibrasi = searchParams.kalibrasi;

    switch (jenis_kalibrasi) {
      case "tekanan":
        Plotly.newPlot(
          plot1,
          [],
          {
            ...initlayout,
            title: "LA3",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: "Tekanan (Pa)",
            },
          },
          configs
        );

        Plotly.newPlot(
          plot2,
          [],
          {
            ...initlayout,
            title: "Klien",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: `Tekanan (${searchParams.psatuan})`,
            },
          },
          configs
        );

        break;

      case "kecepatan":
        Plotly.newPlot(
          plot3,
          [],
          {
            ...initlayout,
            title: "LA3",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: "Kecepatan (m/s)",
            },
          },
          configs
        );

        Plotly.newPlot(
          plot4,
          [],
          {
            ...initlayout,
            title: "Klien",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: `Kecepatan (${searchParams.vsatuan})`,
            },
          },
          configs
        );

        break;

      default:
        Plotly.newPlot(
          plot1,
          [],
          {
            ...initlayout,
            title: "LA3",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: "Tekanan (Pa)",
            },
          },
          configs
        );

        Plotly.newPlot(
          plot2,
          [],
          {
            ...initlayout,
            title: "Klien",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: `Tekanan (${searchParams.psatuan})`,
            },
          },
          configs
        );

        Plotly.newPlot(
          plot3,
          [],
          {
            ...initlayout,
            title: "LA3",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: "Kecepatan (m/s)",
            },
          },
          configs
        );

        Plotly.newPlot(
          plot4,
          [],
          {
            ...initlayout,
            title: "Klien",
            xaxis: { title: "Frekuensi (Hz)" },
            yaxis: {
              title: `Kecepatan (${searchParams.vsatuan})`,
            },
          },
          configs
        );

        break;
    }

    if (state.sensorid) refetch();
  });

  return (
    <div class="grid grid-cols-2 gap-2">
      <Switch>
        <Match when={searchParams.kalibrasi === "tekanan"}>
          <div ref={plot1} class="w-full h-full border shadow" />
          <div ref={plot2} class="w-full h-full border shadow" />
        </Match>

        <Match when={searchParams.kalibrasi === "kecepatan"}>
          <div ref={plot3} class="w-full h-full border shadow" />
          <div ref={plot4} class="w-full h-full border shadow" />
        </Match>

        <Match when={searchParams.kalibrasi === "semua"}>
          <div ref={plot1} class="w-full h-full border shadow" />
          <div ref={plot2} class="w-full h-full border shadow" />
          <div ref={plot3} class="w-full h-full border shadow" />
          <div ref={plot4} class="w-full h-full border shadow" />
        </Match>
      </Switch>
    </div>
  );
}
