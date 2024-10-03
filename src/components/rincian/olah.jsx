import { z } from "zod";
import { createStore } from "solid-js/store";

export default function OlahSensor() {
  const [store, setStore] = createStore({
    run: { value: 1, error: null },
    polar: { value: 1, error: null },
    frekuensi: { value: 0, error: null },
    vpitot: { value: 0, error: null },
    tekanan: { value: 0, error: null },
    temperatur: { value: 0, error: null },
    kelembapan: { value: 0, error: null },
    barometer: { value: 0, error: null },
    vklien: { value: 0, error: null },
    vsatuan: "m/s",
    pklien: { value: 0, error: null },
    psatuan: "Pa",
  });

  const sensor = z
    .object({
      run: z.number().gt(0),
      polar: z.number().gt(0),
      frekuensi: z.number(),
      vpitot: z.number(),
      tekanan: z.number(),
      temperatur: z.number(),
      kelembapan: z.number(),
      barometer: z.number(),
      vklien: z.number(),
      pklien: z.number(),
    })
    .required();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const valid = sensor.safeParse({
      run: "",
      polar: "",
      frekuensi: "",
      vpitot: "",
      tekanan: "",
      temperatur: "",
      kelembapan: "",
      barometer: "",
      vklien: "",
      pklien: "",
    });

    console.log(valid.error.issues);
  };

  return (
    <form onSubmit={onFormSubmit}>
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
            value={store.run.value}
            onInput={(e) => setStore("run.value", e.currentTarget.value)}
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
            value={store.polar.value}
            onInput={(e) => setStore("polar.value", e.currentTarget.value)}
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
            value={store.frekuensi.value}
            onInput={(e) => setStore("frekuensi.value", e.currentTarget.value)}
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
            value={store.vpitot.value}
            onInput={(e) => setStore("vpitot.value", e.currentTarget.value)}
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
            value={store.tekanan.value}
            onInput={(e) => setStore("tekanan.value", e.currentTarget.value)}
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
            value={store.temperatur.value}
            onInput={(e) => setStore("temperatur.value", e.currentTarget.value)}
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
            value={store.kelembapan.value}
            onInput={(e) => setStore("kelembapan.value", e.currentTarget.value)}
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
            value={store.barometer.value}
            onInput={(e) => setStore("barometer.value", e.currentTarget.value)}
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
            value={store.vklien.value}
            onInput={(e) => setStore("vklien.value", e.currentTarget.value)}
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
            <option value="m/s" selected={store.vsatuan == "m/s"}>
              m/s
            </option>
            <option value="km/h" selected={store.vsatuan == "km/h"}>
              km/h
            </option>
            <option value="mph" selected={store.vsatuan == "mph"}>
              mph
            </option>
            <option value="knot" selected={store.vsatuan == "knot"}>
              knot
            </option>
            <option value="ft/s" selected={store.vsatuan == "ft/s"}>
              ft/s
            </option>
            <option value="in/h" selected={store.vsatuan == "in/h"}>
              in/h
            </option>
            <option value="mm/h" selected={store.vsatuan == "mm/h"}>
              mm/h
            </option>
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
            value={store.pklien.value}
            onInput={(e) => setStore("pklien.value", e.currentTarget.value)}
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
            <option value="Pa" selected={store.psatuan == "Pa"}>
              Pa
            </option>
            <option value="hPa" selected={store.psatuan == "hPa"}>
              hPa
            </option>
            <option value="kPa" selected={store.psatuan == "kPa"}>
              kPa
            </option>
            <option value="MPa" selected={store.psatuan == "MPa"}>
              MPa
            </option>
            <option value="bar" selected={store.psatuan == "bar"}>
              bar
            </option>
            <option value="torr" selected={store.psatuan == "torr"}>
              torr
            </option>
            <option value="mH2O" selected={store.psatuan == "mH2O"}>
              mH2O
            </option>
            <option value="inH2O" selected={store.psatuan == "inH2O"}>
              inH2O
            </option>
            <option value="mmHg" selected={store.psatuan == "mmHg"}>
              mmHg
            </option>
            <option value="psi" selected={store.psatuan == "psi"}>
              psi
            </option>
            <option value="ksi" selected={store.psatuan == "ksi"}>
              ksi
            </option>
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
