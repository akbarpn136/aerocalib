import { onMount } from "solid-js";
import Plotly from "plotly.js-dist-min";

export default function DefaultPlot() {
  let plot1;

  const configs = {
    responsive: true,
    scrollZoom: true,
    displayModeBar: false,
    displaylogo: false,
  };

  const layout1 = {
    title: "Distribusi Data Pengujian Kalibrasi",
    responsive: true,
    showlegend: true,
    legend: { orientation: "v" },
    paper_bgcolor: "#eceff4",
    plot_bgcolor: "#eceff4",
    margin: { l: 65, r: 65, b: 75, t: 55, pad: 10 },
    xaxis: { title: "Frekuensi (Hz)" },
    yaxis: { title: "Tekanan (Pa)" },
    yaxis2: {
      title: "Y",
      titlefont: { color: "rgb(148, 103, 189)" },
      tickfont: { color: "rgb(148, 103, 189)" },
      overlaying: "y",
      side: "right",
    },
  };

  const trace1 = {
    x: [1, 2, 3],
    y: [40, 50, 60],
    name: "Tekanan",
    type: "scatter",
    mode: "markers",
  };

  const trace2 = {
    x: [2, 3, 4],
    y: [4, 5, 6],
    name: "Y",
    yaxis: "y2",
    type: "scatter",
    mode: "markers",
  };

  onMount(() => {
    Plotly.newPlot(plot1, [trace1, trace2], layout1, configs);
  });

  return <div ref={plot1} class="w-full h-full border shadow" />;
}
