import { z } from "zod";
import { Save, CircleX } from "lucide-solid";
import { createStore } from "solid-js/store";
import { useParams, useSearchParams } from "@solidjs/router";
import { Show, useContext, createEffect } from "solid-js";

import { AppContext } from "../../stores";
import { buatKegiatan, updateKegiatan } from "../../lib/handlers/kegiatan";

export default function OlahKegiatan() {
  const { state } = useContext(AppContext);
  const [store, setStore] = createStore({
    vsatuan: "m/s",
    psatuan: "Pa",
    kalibrasi: "semua",
    arsip: false,
    pesan: null,
    ubah: false,
    peralatan: { value: null, error: null },
    instansi: { value: null, error: null },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  const Kegiatan = z
    .object({
      peralatan: z.string().min(3),
      instansi: z.string().min(3),
    })
    .required();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const db = state.surreal;

    const valid = Kegiatan.safeParse({
      peralatan: store.peralatan.value,
      instansi: store.instansi.value,
    });

    setStore("peralatan", "error", null);
    setStore("instansi", "error", null);

    if (valid.success) {
      setStore("peralatan", "value", null);
      setStore("instansi", "value", null);

      const peralatan = valid.data.peralatan;
      const instansi = valid.data.instansi;

      if (store.ubah) {
        try {
          setStore("pesan", null);
          const result = await updateKegiatan({
            db,
            id: params.id,
            peralatan,
            instansi,
            kalibrasi: store.kalibrasi,
            psatuan: store.psatuan,
            vsatuan: store.vsatuan,
            arsip: store.arsip,
          });

          setSearchParams({
            peralatan: result[0].peralatan,
            instansi: result[0].instansi,
            psatuan: result[0].psatuan,
            vsatuan: result[0].vsatuan,
            kalibrasi: result[0].kalibrasi,
          });

          document.getElementById("modal_olah_kegiatan").close();
        } catch (err) {
          setStore("pesan", err.message);
        }
      } else {
        try {
          setStore("pesan", null);

          await buatKegiatan({
            db,
            peralatan,
            instansi,
            kalibrasi: store.kalibrasi,
            vsatuan: store.vsatuan,
            psatuan: store.psatuan,
          });

          setSearchParams({
            pagekegiatan: 1,
            arsip: false,
          });

          document.getElementById("modal_olah_kegiatan").close();
        } catch (err) {
          setStore("pesan", err.message);
        }
      }
    } else {
      valid.error.issues.forEach((err) => {
        const kategori = err.path[0];

        switch (kategori) {
          case "peralatan":
            setStore("peralatan", "error", err.message);
            break;

          case "instansi":
            setStore("instansi", "error", err.message);
            break;
        }
      });
    }
  };

  createEffect(() => {
    if (params.id == null) {
      setStore("ubah", false);
      setStore("peralatan", "value", null);
      setStore("instansi", "value", null);
      setStore("psatuan", "Pa");
      setStore("vsatuan", "m/s");
    } else {
      setStore("ubah", true);
      setStore("peralatan", "value", searchParams.peralatan);
      setStore("instansi", "value", searchParams.instansi);
      setStore("psatuan", searchParams.psatuan);
      setStore("vsatuan", searchParams.vsatuan);
      setStore("kalibrasi", searchParams.kalibrasi);
      setStore("arsip", searchParams.arsip === "true");
    }
  });

  return (
    <form class="space-y-4">
      <Show when={store.pesan}>
        <div role="alert" class="alert alert-error">
          <CircleX size={19} />
          <span>{store.pesan}</span>
        </div>
      </Show>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Peralatan</span>
        </div>

        <input
          type="text"
          name="peralatan"
          id="peralatan"
          class="input input-bordered w-full"
          classList={{
            "input-error": store.peralatan.error,
            "": !store.peralatan.error,
          }}
          placeholder="Nama peralatan"
          value={store.peralatan.value}
          onInput={(e) => setStore("peralatan", "value", e.currentTarget.value)}
        />

        <Show when={store.peralatan.error}>
          <div class="label">
            <span class="label-text-alt text-error">
              {store.peralatan.error}
            </span>
          </div>
        </Show>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Instansi</span>
        </div>

        <input
          type="text"
          name="instansi"
          id="instansi"
          class="input input-bordered w-full"
          classList={{
            "input-error": store.instansi.error,
            "": !store.instansi.error,
          }}
          placeholder="Instansi atau perusahaan"
          value={store.instansi.value}
          onInput={(e) => setStore("instansi", "value", e.currentTarget.value)}
        />

        <Show when={store.instansi.error}>
          <div class="label">
            <span class="label-text-alt text-error">
              {store.instansi.error}
            </span>
          </div>
        </Show>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Jenis kalibrasi</span>
        </div>
        <select
          class="select select-bordered"
          onChange={(e) => setStore("kalibrasi", e.currentTarget.value)}
        >
          <option value="semua" selected={store.kalibrasi === "semua"}>
            Semuanya
          </option>
          <option value="tekanan" selected={store.kalibrasi === "tekanan"}>
            Tekanan
          </option>
          <option value="kecepatan" selected={store.kalibrasi === "kecepatan"}>
            Kecepatan
          </option>
        </select>
      </label>

      <div class="grid gap-6 mb-5 md:grid-cols-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Satuan kecepatan klien</span>
          </div>
          <select
            class="select select-bordered"
            onChange={(e) => setStore("vsatuan", e.currentTarget.value)}
            disabled={store.kalibrasi === "tekanan"}
          >
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
            <span class="label-text">Satuan tekanan klien</span>
          </div>
          <select
            class="select select-bordered"
            onChange={(e) => setStore("psatuan", e.currentTarget.value)}
            disabled={store.kalibrasi === "kecepatan"}
          >
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

      <Show when={store.ubah}>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Arsipkan?</span>
            <input
              type="checkbox"
              checked={store.arsip}
              class="checkbox"
              onClick={() => setStore("arsip", !store.arsip)}
            />
          </label>
        </div>
      </Show>

      <button
        class="btn btn-primary text-primary-content"
        onClick={onFormSubmit}
      >
        <Save size={19} />
        Simpan
      </button>
    </form>
  );
}
