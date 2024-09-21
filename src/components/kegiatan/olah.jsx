import { Save } from "lucide-solid";
import { useContext, createSignal, createEffect, Show } from "solid-js";

import ToastSalah from "../toast/salah";
import { produce } from "solid-js/store";
import { AppContext } from "../../stores";
import { buatKegiatan } from "../../lib/handlers/kegiatan";

export default function OlahKegiatan() {
  const { state, setState } = useContext(AppContext);

  const [peralatan, setPeralatan] = createSignal("");
  const [peralatanError, setPeralatanError] = createSignal(false);

  const [instansi, setInstansi] = createSignal("");
  const [instansiError, setInstansiError] = createSignal(false);

  const onFormSubmit = async (e) => {
    const db = state.surreal;

    e.preventDefault();

    if (peralatan() == "") {
      setPeralatanError(true);
    } else {
      setPeralatanError(false);
    }

    if (instansi() == "") {
      setInstansiError(true);
    } else {
      setInstansiError(false);
    }

    if (!instansiError() && !peralatanError()) {
      try {
        const result = await buatKegiatan(db, {
          peralatan: peralatan(),
          instansi: instansi(),
        });

        setState(
          "kegiatan",
          produce((kegiatans) => {
            kegiatans.pop();
            kegiatans.unshift(result[0]);
          })
        );
      } catch (err) {
        setState(
          "keliru",
          produce((payload) => {
            payload.benarkah = true;
            payload.pesan = err.message;
          })
        );
      }

      setmodal(false);
      setInstansiError(false);
      setPeralatanError(false);
    }
  };

  return (
    <form class="space-y-4">
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
            <span class="label-text-alt text-error">Peralatan diperlukan</span>
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
            <span class="label-text-alt text-error">Instansi diperlukan</span>
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
