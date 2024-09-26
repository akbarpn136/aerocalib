export default function DefaultTable() {
  return (
    <div class="pb-5">
      <div class="overflow-x-auto">
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
              <th>V Klien (ft/min)</th>
              <th>P Klien (inH2O)</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>1</th>
              <td>7.3</td>
              <td>5</td>
              <td>14.8</td>
              <td>25.8</td>
              <td>93.4</td>
              <td>1004.1</td>
              <td>1200.00</td>
              <td>0.09</td>
              <td>Selasa, 24 September 2024 pukul 17.27</td>
            </tr>

            <tr>
              <th>1</th>
              <th>1</th>
              <td>14.00</td>
              <td>10.01</td>
              <td>59</td>
              <td>26.9</td>
              <td>93.4</td>
              <td>1002.9</td>
              <td>2250.00</td>
              <td>0.32</td>
              <td>Selasa, 24 September 2024 pukul 16.28</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Run</th>
              <th>Polar</th>
              <th>Frekuensi (Hz)</th>
              <th>V Pitot (m/s)</th>
              <th>P (Pa)</th>
              <th>T (°C)</th>
              <th>H (% rh)</th>
              <th>Pb (hPa)</th>
              <th>V Klien (ft/min)</th>
              <th>P Klien (inH2O)</th>
              <th>Dibuat</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
