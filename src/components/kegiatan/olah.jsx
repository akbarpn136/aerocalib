import { z } from "zod";
import { Save, CircleX } from "lucide-solid";
import { useParams, useSearchParams } from "@solidjs/router";
import { Show, useContext, createSignal, createEffect } from "solid-js";

import { AppContext } from "../../stores";
import { buatKegiatan, updateKegiatan } from "../../lib/handlers/kegiatan";

export default function OlahKegiatan() {
  const { state, _ } = useContext(AppContext);

  const [peralatan, setPeralatan] = createSignal(null);
  const [peralatanPesan, setPeralatanPesan] = createSignal(null);
  const [peralatanError, setPeralatanError] = createSignal(false);

  const [instansi, setInstansi] = createSignal(null);
  const [instansiPesan, setInstansiPesan] = createSignal(null);
  const [instansiError, setInstansiError] = createSignal(false);

  const [pesan, setPesan] = createSignal(null);
  const [ubah, setUbah] = createSignal(false);

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
      peralatan: peralatan(),
      instansi: instansi(),
    });

    if (valid.success) {
      setPeralatanError(false);
      setPeralatanPesan(null);

      setInstansiError(false);
      setInstansiPesan(null);

      const peralatan = valid.data.peralatan;
      const instansi = valid.data.instansi;

      if (ubah()) {
        try {
          setPesan(null);
          const result = await updateKegiatan({
            db,
            id: params.id,
            peralatan,
            instansi,
          });

          setSearchParams({
            peralatan: result[0].peralatan,
            instansi: result[0].instansi,
          });
        } catch (err) {
          setPesan(err.message);
        }
      } else {
        try {
          setPesan(null);
          await buatKegiatan({ db, peralatan, instansi });

          setSearchParams({
            pagekegiatan: 1,
          });
        } catch (err) {
          setPesan(err.message);
        }
      }

      document.getElementById("modal_olah_kegiatan").close();
    } else {
      valid.error.issues.forEach((err) => {
        if (err.path[0] === "peralatan") {
          setPeralatanError(true);
          setPeralatanPesan(err.message);
        } else {
          setInstansiError(true);
          setInstansiPesan(err.message);
        }
      });
    }
  };

  createEffect(() => {
    if (params.id == null) {
      setUbah(false);
    } else {
      setUbah(true);
      setPeralatan(searchParams.peralatan);
      setInstansi(searchParams.instansi);
    }
  });

  return (
    <form class="space-y-4">
      <Show when={pesan()}>
        <div role="alert" class="alert alert-error">
          <CircleX size={19} />
          <span>{pesan()}</span>
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
            "input-error": peralatanError(),
            "": !peralatanError(),
          }}
          placeholder="Nama peralatan"
          value={peralatan()}
          onInput={(e) => setPeralatan(e.currentTarget.value)}
        />

        <Show when={peralatanError()}>
          <div class="label">
            <span class="label-text-alt text-error">{peralatanPesan}</span>
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
            "input-error": instansiError(),
            "": !instansiError(),
          }}
          placeholder="Instansi atau perusahaan"
          value={instansi()}
          onInput={(e) => setInstansi(e.currentTarget.value)}
        />

        <Show when={instansiError()}>
          <div class="label">
            <span class="label-text-alt text-error">{instansiPesan}</span>
          </div>
        </Show>
      </label>

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
