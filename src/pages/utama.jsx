import { produce } from "solid-js/store";
import { A, useSearchParams } from "@solidjs/router";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
} from "lucide-solid";
import {
  For,
  Show,
  Switch,
  Match,
  useContext,
  createEffect,
  createSignal,
} from "solid-js";

import { AppContext } from "../stores";
import { cariKegiatan, filterKegiatan } from "../lib/handlers/kegiatan";

export default function HalamanUtama() {
  const limit = Number(import.meta.env.VITE_LIMIT_KEGIATAN);

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = createSignal(1);
  const [kata, setKata] = createSignal("");
  const [kosong, setKosong] = createSignal(true);
  const [sebelumnya, setSebelumnya] = createSignal(true);
  const [selanjutnya, setSelanjutnya] = createSignal(true);

  const { state, setState } = useContext(AppContext);

  const nextPage = () => {
    setPage(page() + 1);

    setSearchParams({
      pagekegiatan: page(),
    });
  };

  const prevPage = () => {
    if (page() > 1) {
      setPage(page() - 1);
    } else {
      setPage(1);
    }

    setSearchParams({
      pagekegiatan: page(),
    });
  };

  const onFilterKegiatan = async (
    db,
    page,
    limit,
    cari = "",
    arsip = false
  ) => {
    let hasil;
    let hasil_next;

    try {
      if (cari !== "") {
        hasil = await cariKegiatan(
          state.surreal,
          page,
          limit,
          cari,
          state.arsipkegiatan
        );

        hasil_next = await cariKegiatan(
          state.surreal,
          page + 1,
          limit,
          cari,
          state.arsipkegiatan
        );
      } else {
        hasil = await filterKegiatan(db, page, limit, arsip);

        hasil_next = await filterKegiatan(db, page + 1, limit, arsip);
      }

      if (hasil_next.length == 0) {
        setSelanjutnya(false);
      } else {
        setSelanjutnya(true);
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
          parseInt(searchParams.pagekegiatan),
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
        await onFilterKegiatan(
          db,
          searchParams.pagekegiatan ? parseInt(searchParams.pagekegiatan) : 1,
          limit,
          kata(),
          state.arsipkegiatan
        );
      } catch (err) {
        throw err;
      }

      if (state.kegiatan.length == 0) {
        setKosong(true);
      } else {
        setKosong(false);
      }

      if (parseInt(searchParams.pagekegiatan) == 1) {
        setSebelumnya(false);
      } else {
        setSebelumnya(true);
      }
    }
  });

  return (
    <div class="card card-compact bg-base-100 shadow-sm border">
      <nav
        class="flex items-center flex-column flex-wrap md:flex-row justify-between p-2"
        aria-label="Table navigation"
      >
        <Show when={kosong()}>
          <span class="ms-2 text-sm text-gray-500 dark:text-gray-300">
            Informasi tidak ada.
          </span>
        </Show>

        <Show when={state.kegiatan.length > 0}>
          <label class="input input-bordered input-sm flex items-center gap-2">
            <input
              type="text"
              class="grow"
              placeholder="Cari kegiatan..."
              value={kata()}
              onKeyUp={onCariPeralatan}
            />
            <Search size={19} />
          </label>
        </Show>

        <Show when={!kosong()}>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <Show when={sebelumnya()}>
              <li>
                <button
                  type="button"
                  class="btn btn-sm"
                  classList={{
                    "rounded-e-none": state.kegiatan.length == limit,
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
                  class="btn btn-sm"
                  classList={{
                    "rounded-s-none": parseInt(searchParams.pagekegiatan) > 1,
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

      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th scope="col">Peralatan</th>
              <th scope="col">Instansi</th>
              <th scope="col">Dibuat</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          <tbody>
            <Switch>
              <Match when={!kosong()}>
                <For each={state.kegiatan}>
                  {(item, index) => {
                    return (
                      <tr>
                        <th scope="row">{item.peralatan}</th>
                        <td>{item.instansi}</td>
                        <td>
                          {item.dibuat.toLocaleString("id-id", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>
                          <A
                            href={`${item.id.id}/rincian?peralatan=${item.peralatan}&instansi=${item.instansi}`}
                            class="btn btn-ghost btn-sm"
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
                <tr>
                  <th scope="row">-</th>
                  <td class="px-6 py-4">-</td>
                  <td class="px-6 py-4">-</td>
                  <td class="px-6 py-4">-</td>
                </tr>
              </Match>
            </Switch>
          </tbody>
        </table>
      </div>
    </div>
  );
}
