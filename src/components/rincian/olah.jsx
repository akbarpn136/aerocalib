import { z } from "zod";
import { CircleX, Check } from "lucide-solid";
import { useParams } from "@solidjs/router";
import { createStore, produce } from "solid-js/store";
import { Show, Switch, Match, useContext } from "solid-js";

import { AppContext } from "../../stores";
import { buatSensor } from "../../lib/handlers/sensor";

export default function OlahSensor() {
  const params = useParams();
  const { state } = useContext(AppContext);
  const [store, setStore] = createStore({
    validkah: true,
    submitpesan: { pesanerror: null, pesansuccess: null },
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

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const db = state.surreal;
    const kegiatanId = params.id;
    const payload = {
      run: store.run.value,
      polar: store.polar.value,
      frekuensi: store.frekuensi.value,
      vpitot: store.vpitot.value,
      tekanan: store.tekanan.value,
      temperatur: store.temperatur.value,
      kelembapan: store.kelembapan.value,
      barometer: store.barometer.value,
      vklien: store.vklien.value,
      pklien: store.pklien.value,
    };

    const valid = sensor.safeParse(payload);
    if (valid.success) {
      setStore("validkah", true);

      const user_data = {
        db,
        psatuan: store.psatuan,
        vsatuan: store.vsatuan,
        kegiatan: kegiatanId,
        ...payload,
      };

      try {
        const result = await buatSensor({ ...user_data });
        const id = result[0]["id"]["id"]

        setStore("submitpesan", produce((data) => {
          data.pesanerror = null;
          data.pesansuccess = `Data ${id} berhasil disimpan`;
        }));
      } catch (err) {
        setStore("submitpesan", produce((data) => {
          data.pesansuccess = null;
          data.pesanerror = err.message;
        }));
      }
    } else {
      setStore("validkah", false);
      valid.error.issues.forEach((err) => {
        const kategori = err.path[0];

        switch (kategori) {
          case "run":
            setStore("run", "error", err.message);
            break;

          case "polar":
            setStore("polar", "error", err.message);
            break;

          case "frekuensi":
            setStore("frekuensi", "error", err.message);
            break;

          case "vpitot":
            setStore("vpitot", "error", err.message);
            break;

          case "tekanan":
            setStore("tekanan", "error", err.message);
            break;

          case "temperatur":
            setStore("temperatur", "error", err.message);
            break;

          case "kelembapan":
            setStore("kelembapan", "error", err.message);
            break;

          case "barometer":
            setStore("barometer", "error", err.message);
            break;

          case "vklien":
            setStore("vklien", "error", err.message);
            break;

          case "pklien":
            setStore("pklien", "error", err.message);
            break;
        }
      });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Switch>
        <Match when={store.submitpesan.pesanerror}>
          <div role="alert" class="alert alert-error">
            <CircleX size={19} />
            <span>{store.submitpesan.pesanerror}</span>
            <button class="btn btn-sm" onClick={() => setStore("submitpesan", "pesanerror", null)}>Tutup</button>
          </div>
        </Match>

        <Match when={store.submitpesan.pesansuccess} >
          <div role="alert" class="alert alert-success">
            <Check size={19} />
            <span>{store.submitpesan.pesansuccess}</span>
            <button class="btn btn-sm" onClick={() => setStore("submitpesan", "pesansuccess", null)}>Tutup</button>
          </div>
        </Match>
      </Switch>

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
            onInput={(e) =>
              setStore("run", "value", parseInt(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">{store.run.error}</span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("polar", "value", parseInt(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">{store.polar.error}</span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("frekuensi", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.frekuensi.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("vpitot", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.vpitot.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("tekanan", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.tekanan.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("temperatur", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.temperatur.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("kelembapan", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.kelembapan.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("barometer", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.barometer.error}
              </span>
            </div>
          </Show>
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
            onInput={(e) =>
              setStore("vklien", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.vklien.error}
              </span>
            </div>
          </Show>
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
            <option value="ft/min" selected={store.vsatuan == "ft/min"}>
              ft/min
            </option>
            <option value="in/h" selected={store.vsatuan == "in/h"}>
              in/h
            </option>
            <option value="mm/h" selected={store.vsatuan == "mm/h"}>
              mm/h
            </option>
          </select>
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
            onInput={(e) =>
              setStore("pklien", "value", parseFloat(e.currentTarget.value))
            }
          />

          <Show when={!store.validkah}>
            <div class="label">
              <span class="label-text-alt text-error">
                {store.pklien.error}
              </span>
            </div>
          </Show>
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
        </label>
      </div>

      <button type="submit" class="btn btn-primary">
        Simpan
      </button>
    </form>
  );
}
