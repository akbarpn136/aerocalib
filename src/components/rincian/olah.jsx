export default function OlahSensor() {
  return (
    <form>
      <div class="grid gap-6 mb-5 md:grid-cols-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Run</span>
          </div>
          <input
            type="number"
            placeholder="1, 2, 3,..."
            min="1"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Polar</span>
          </div>
          <input
            type="number"
            placeholder="1, 2, 3,..."
            min="1"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Frekuensi (Hz)</span>
          </div>
          <input
            type="number"
            placeholder="Frekuensi pemutar turbin"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Kecepatan Pitot (m/s)</span>
          </div>
          <input
            type="number"
            placeholder="Kecepatan yang dibaca oleh pitot"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Tekanan dinamik (Pa)</span>
          </div>
          <input
            type="number"
            placeholder="Tekanan dinamik terukur"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>
      </div>

      <div class="grid gap-6 mb-5 md:grid-cols-3">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Temperatur (°C)</span>
          </div>
          <input
            type="number"
            placeholder="Temperatur terukur"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Kelembapan (% rh)</span>
          </div>
          <input
            type="number"
            placeholder="Kelembapan udara"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Tekanan barometer (hPa)</span>
          </div>
          <input
            type="number"
            placeholder="Tekanan barometer udara sekitar"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>
      </div>

      <div class="grid gap-6 mb-5 md:grid-cols-4">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Kecepatan udara klien</span>
          </div>
          <input
            type="number"
            placeholder="Instrumen kecepatan udara"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Satuan</span>
          </div>
          <select class="select select-bordered">
            <option value="m/s">m/s</option>
            <option value="km/h">km/s</option>
            <option value="mph">mph</option>
            <option value="knot">knot</option>
            <option value="ft/s">ft/s</option>
            <option value="in/h">in/h</option>
            <option value="mm/h">mm/h</option>
          </select>
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Tekanan dinamik klien</span>
          </div>
          <input
            type="number"
            placeholder="Instrumen tekanan dinamik"
            min="0"
            step=".01"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Satuan</span>
          </div>
          <select class="select select-bordered">
            <option value="Pa">Pa</option>
            <option value="hPa">hPa</option>
            <option value="kPa">kPa</option>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="torr">torr</option>
            <option value="mH2O">mH2O</option>
            <option value="mmHg">mmHg</option>
            <option value="psi">psi</option>
            <option value="ksi">ksi</option>
          </select>
          <div class="label">
            <span class="label-text-alt"></span>
          </div>
        </label>
      </div>

      <button type="submit" class="btn btn-primary">
        Simpan
      </button>
    </form>
  );
}
