import { A } from "@solidjs/router";
import {
  EllipsisVertical,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-solid";
import {
  For,
  Show,
  Switch,
  Match,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

import { AppContext } from "../stores";
import { produce } from "solid-js/store";
import { cariKegiatan, filterKegiatan } from "../lib/handlers/kegiatan";

export default function HalamanUtama() {
  const limit = Number(import.meta.env.VITE_LIMIT_KEGIATAN);

  const [page, setPage] = createSignal(1);
  const [kata, setKata] = createSignal("");
  const [kosong, setKosong] = createSignal(true);
  const [sebelumnya, setSebelumnya] = createSignal(true);
  const [selanjutnya, setSelanjutnya] = createSignal(true);

  const { state, setState } = useContext(AppContext);

  const nextPage = () => {
    setPage(page() + 1);
  };

  const prevPage = () => {
    if (page() > 1) {
      setPage(page() - 1);
    } else {
      setPage(1);
    }
  };

  const onFilterKegiatan = async (
    db,
    page,
    limit,
    cari = "",
    arsip = false
  ) => {
    let hasil;

    try {
      if (cari !== "") {
        hasil = await cariKegiatan(
          state.surreal,
          page,
          limit,
          cari,
          state.arsipkegiatan
        );
      } else {
        hasil = await filterKegiatan(db, page, limit, arsip);
      }

      if (hasil.length > 0) {
        setKosong(false);
        setState("kegiatan", []); // reset empty dulu array
        setState(
          "kegiatan",
          produce((keg) => {
            hasil.forEach((el) => {
              keg.push(el);
            });
          })
        );
      } else {
        setState("kegiatan", []);
        setKosong(true);
      }
    } catch (err) {
      throw err;
    }
  };

  const onCariPeralatan = async (e) => {
    if (e.keyCode == 13) {
      setPage(1);
      setKata(e.currentTarget.value);

      try {
        await onFilterKegiatan(
          state.surreal,
          page(),
          limit,
          kata(),
          state.arsipkegiatan
        );
      } catch (err) {
        throw err;
      }
    }
  };

  createEffect(async () => {
    const db = state.surreal;

    if (db !== null) {
      if (state.arsipkegiatan) {
        setPage(1);
      }

      try {
        await onFilterKegiatan(db, page(), limit, kata(), state.arsipkegiatan);
      } catch (err) {
        throw err;
      }

      if (state.kegiatan.length == 0) {
        setKosong(true);
      } else {
        setKosong(false);
      }

      if (state.kegiatan.length < limit) {
        setSelanjutnya(false);
      } else {
        setSelanjutnya(true);
      }

      if (page() == 1) {
        setSebelumnya(false);
      } else {
        setSebelumnya(true);
      }
    }
  });

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg border">
      <nav
        class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-2 pb-4"
        aria-label="Table navigation"
      >
        <Show when={kosong()}>
          <span class="ms-2 text-sm text-gray-500 dark:text-gray-300">
            Informasi tidak ada.
          </span>
        </Show>

        <Show when={state.kegiatan.length > 0}>
          <div class="mx-2 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">
              Temukan kegiatan...
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search size={19} />
              </div>
              <input
                type="text"
                class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Temukan kegiatan..."
                value={kata()}
                onKeyUp={onCariPeralatan}
              />
            </div>
          </div>
        </Show>

        <Show when={!kosong()}>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 me-2">
            <Show when={sebelumnya()}>
              <li>
                <button
                  type="button"
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  classList={{
                    "rounded-s-lg": state.kegiatan.length == limit,
                    "rounded-lg": state.kegiatan.length < limit,
                  }}
                  onClick={prevPage}
                >
                  <ChevronLeft size={19} />
                </button>
              </li>
            </Show>

            <Show when={selanjutnya()}>
              <li>
                <button
                  type="button"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  classList={{
                    "rounded-e-lg": page() > 1,
                    "rounded-lg": page() == 1,
                  }}
                  onClick={nextPage}
                >
                  <ChevronRight size={19} />
                </button>
              </li>
            </Show>
          </ul>
        </Show>
      </nav>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Peralatan
            </th>
            <th scope="col" class="px-6 py-3">
              Instansi
            </th>
            <th scope="col" class="px-6 py-3">
              Dibuat
            </th>
            <th scope="col" class="px-6 py-3">
              Opsi
            </th>
          </tr>
        </thead>
        <tbody>
          <Switch>
            <Match when={!kosong()}>
              <For each={state.kegiatan}>
                {(item, index) => {
                  return (
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.peralatan}
                      </th>
                      <td class="px-6 py-4">{item.instansi}</td>
                      <td class="px-6 py-4">
                        {item.dibuat.toLocaleString("id-id", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td class="px-6 py-4">
                        <A
                          href={`${item.id.id}/rincian`}
                          class="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-tablet-view hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          <EllipsisVertical size={19} />
                        </A>
                      </td>
                    </tr>
                  );
                }}
              </For>
            </Match>

            <Match when={kosong()}>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  -
                </th>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
              </tr>
            </Match>
          </Switch>
        </tbody>
      </table>
    </div>
  );
}
