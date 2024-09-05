import { createSignal, Show } from "solid-js";
import { useContext } from "solid-js";

import { AppContext } from "../../stores";
import { buatKegiatan } from "../../handlers/kegiatan";
import ToastSalah from "../toast/salah";
import { produce } from "solid-js/store";

export default function OlahKegiatan({ setmodal }) {
  const { state, setState } = useContext(AppContext);

  const [peralatan, setPeralatan] = createSignal("");
  const [peralatanError, setPeralatanError] = createSignal(false);

  const [instansi, setInstansi] = createSignal("");
  const [instansiError, setInstansiError] = createSignal(false);

  const onShowModal = () => {
    setmodal(false);
  };

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

        console.log(result);
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
    <div
      tabindex="-1"
      aria-hidden="true"
      class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Olah Kegiatan
            </h3>
          </div>

          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label
                  for="peralatan"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Peralatan
                </label>
                <input
                  type="text"
                  name="peralatan"
                  id="peralatan"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  classList={{
                    "bg-red-50": peralatanError(),
                    "bg-gray-50": !peralatanError(),
                  }}
                  placeholder="Nama peralatan"
                  value={peralatan()}
                  onInput={(e) => setPeralatan(e.currentTarget.value)}
                />

                <Show when={peralatanError()}>
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span class="font-medium">Peralatan</span> diperlukan.
                  </p>
                </Show>
              </div>

              <div class="col-span-2">
                <label
                  for="peralatan"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Instansi
                </label>
                <input
                  type="text"
                  name="peralatan"
                  id="instansi"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  classList={{
                    "bg-red-50": instansiError(),
                    "bg-gray-50": !instansiError(),
                  }}
                  placeholder="Instansi atau perusahaan"
                  value={instansi()}
                  onInput={(e) => setInstansi(e.currentTarget.value)}
                />

                <Show when={instansiError()}>
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span class="font-medium">Instansi</span> diperlukan.
                  </p>
                </Show>
              </div>
            </div>

            <div class="inline-flex items-center gap-2">
              <button
                type="submit"
                class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onFormSubmit}
              >
                <svg
                  class="me-1 -ms-1 w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z"
                  />
                </svg>
                Simpan
              </button>

              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={onShowModal}
              >
                Tutup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
