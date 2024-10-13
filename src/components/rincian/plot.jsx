import { onMount, createEffect } from "solid-js";
import Plotly from "plotly.js-dist-min";
import { useSearchParams } from "@solidjs/router";

export default function DefaultPlot() {
  let plot1;

  const [searchParams] = useSearchParams();

  onMount(() => {
    let layout;
    let traces = [];

    const jenis_kalibrasi = searchParams.kalibrasi;
    const initlayout = {
      title: "Distribusi Data Pengujian Kalibrasi",
      responsive: true,
      showlegend: false,
      legend: { orientation: "v" },
      paper_bgcolor: "#eceff4",
      plot_bgcolor: "#eceff4",
      margin: { l: 65, r: 65, b: 75, t: 50, pad: 10 },
    };

    const configs = {
      responsive: true,
      scrollZoom: false,
      displayModeBar: false,
      displaylogo: false,
    };

    switch (jenis_kalibrasi) {
      case "tekanan":
        layout = {
          ...initlayout,
          xaxis: { title: "Frekuensi (Hz)" },
          yaxis: {
            title: "Tekanan (Pa)",
          },

          xaxis2: { title: "Frekuensi (Hz)" },
          yaxis2: {
            title: `Tekanan (${searchParams.psatuan})`,
          },
          grid: { rows: 1, columns: 2, pattern: "independent" },
        };

        const trace1 = {
          x: [1, 2, 3],
          y: [40, 50, 60],
          name: "LA3",
          type: "scatter",
          mode: "markers",
          xaxis: "x",
          yaxis: "y",
        };

        const trace2 = {
          x: [2, 3, 4],
          y: [4, 5, 6],
          name: "Client",
          type: "scatter",
          mode: "markers",
          xaxis: "x2",
          yaxis: "y2",
        };

        traces.push(trace1, trace2);

        break;

      case "kecepatan":
        layout = {
          ...initlayout,
          xaxis: { title: "Frekuensi (Hz)" },
          yaxis: {
            title: "Kecepatan (m/s)",
          },

          xaxis2: { title: "Frekuensi (Hz)" },
          yaxis2: {
            title: `Kecepatan (${searchParams.vsatuan})`,
          },
          grid: { rows: 1, columns: 2, pattern: "independent" },
        };

        const trace3 = {
          x: [1, 2, 3],
          y: [0, 15, 45],
          name: "LA32",
          type: "scatter",
          mode: "markers",
          xaxis: "x",
          yaxis: "y",
        };

        const trace4 = {
          x: [2, 3, 4],
          y: [0, 8, 6],
          name: "Client2",
          type: "scatter",
          mode: "markers",
          xaxis: "x2",
          yaxis: "y2",
        };

        traces.push(trace3, trace4);

        break;

      default:
        layout = {
          ...initlayout,
          xaxis: { title: "Frekuensi (Hz)" },
          yaxis: {
            title: "Tekanan (Pa)",
          },

          xaxis2: { title: "Frekuensi (Hz)" },
          yaxis2: {
            title: `Tekanan (${searchParams.psatuan})`,
          },

          xaxis3: { title: "Frekuensi (Hz)" },
          yaxis3: {
            title: "Kecepatan (m/s)",
          },

          xaxis4: { title: "Frekuensi (Hz)" },
          yaxis4: {
            title: `Kecepatan (${searchParams.vsatuan})`,
          },

          grid: { rows: 2, columns: 2, pattern: "independent" },
        };

        const trace5 = {
          x: [1, 2, 3],
          y: [40, 50, 60],
          name: "LA3",
          type: "scatter",
          mode: "markers",
          xaxis: "x",
          yaxis: "y",
        };

        const trace6 = {
          x: [2, 3, 4],
          y: [4, 5, 6],
          name: "Client",
          type: "scatter",
          mode: "markers",
          xaxis: "x2",
          yaxis: "y2",
        };

        const trace7 = {
          x: [1, 2, 3],
          y: [0, 15, 45],
          name: "LA32",
          type: "scatter",
          mode: "markers",
          xaxis: "x3",
          yaxis: "y3",
        };

        const trace8 = {
          x: [2, 3, 4],
          y: [0, 8, 6],
          name: "Client2",
          type: "scatter",
          mode: "markers",
          xaxis: "x4",
          yaxis: "y4",
        };

        traces.push(trace5, trace6, trace7, trace8);

        break;
    }

    Plotly.newPlot(plot1, traces, layout, configs);
  });

  createEffect(() => {
    let update;
    const kalibrasi = searchParams.kalibrasi;

    switch (kalibrasi) {
      case "tekanan":
        update = {
          yaxis2: {
            title: `Tekanan (${searchParams.psatuan})`,
          },
          grid: { rows: 1, columns: 2, pattern: "independent" },
        };

        break;

      case "kecepatan":
        update = {
          yaxis2: {
            title: `Kecepatan (${searchParams.vsatuan})`,
          },
          grid: { rows: 1, columns: 2, pattern: "independent" },
        };

        break;
      default:
        update = {
          yaxis2: {
            title: `Tekanan (${searchParams.psatuan})`,
          },
          yaxis4: {
            title: `Kecepatan (${searchParams.vsatuan})`,
          },
          grid: { rows: 2, columns: 2, pattern: "independent" },
        };

        break;
    }

    Plotly.relayout(plot1, update);
    Plotly.react(plot1, plot1.data, plot1.layout);
  });

  return <div ref={plot1} class="w-full h-full border shadow" />;
}
