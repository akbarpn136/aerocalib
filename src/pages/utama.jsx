import { createStore, produce } from "solid-js/store";
import { A, useSearchParams } from "@solidjs/router";
import {
  Search,
  CircleX,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
} from "lucide-solid";
import {
  For,
  Show,
  Switch,
  Match,
  Suspense,
  useContext,
  createEffect,
  createResource,
  lazy,
} from "solid-js";

import { AppContext } from "../stores";
import { cariKegiatan, filterKegiatan } from "../lib/handlers/kegiatan";

export default function HalamanUtama() {
  const SkeletonUtama = lazy(() => import("../components/kegiatan/skeleton"));

  const limit = Number(import.meta.env.VITE_LIMIT_KEGIATAN);

  const { state } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [store, setStore] = createStore({
    page: 1,
    cari: "",
    selanjutnya: false,
  });

  const bacaKegiatan = async ({ db, page, limit, cari, arsip }) => {
    let hasil;
    let hasil_next;

    if (cari !== "") {
      hasil = await cariKegiatan(db, page, limit, cari);
      hasil_next = await cariKegiatan(db, page + 1, limit, cari);
    } else {
      hasil = await filterKegiatan(db, page, limit, arsip);
      hasil_next = await filterKegiatan(db, page + 1, limit, arsip);
    }

    if (hasil_next.length > 0) {
      setStore("selanjutnya", true);
    } else {
      setStore("selanjutnya", false);
    }

    return hasil;
  };

  const [kegiatan, { refetch }] = createResource(
    () => ({
      limit,
      db: state.surreal,
      page: store.page,
      cari: store.cari,
      arsip: searchParams.arsip === "true",
    }),
    bacaKegiatan
  );

  const nextPage = () => {
    setStore("page", store.page + 1);
  };

  const prevPage = () => {
    if (store.page > 1) {
      setStore("page", store.page - 1);
    } else {
      setStore("page", 1);
    }
  };

  const onCariPeralatan = async (e) => {
    e.preventDefault();

    if (e.keyCode == 13) {
      setStore("page", 1);
      setStore("cari", e.currentTarget.value);
    }
  };

  createEffect(() => {
    if (state.kegiatanid) {
      setStore("page", 1);
      setStore("arsip", false);

      refetch();
    }
  });

  return (
    <div class="card card-compact bg-base-100 shadow-sm border">
      <Suspense fallback={<SkeletonUtama />}>
        <Switch>
          <Match when={kegiatan.error}>
            <div class="card-body">
              <div role="alert" class="alert alert-error">
                <CircleX size={19} />
                <span>{kegiatan.error.message}</span>
              </div>
            </div>
          </Match>

          <Match when={kegiatan()}>
            <nav
              class="flex items-center flex-column flex-wrap md:flex-row justify-between p-2"
              aria-label="Table navigation"
            >
              <Switch>
                <Match when={kegiatan().length == 0}>
                  <span class="ms-2 text-sm text-gray-500 dark:text-gray-300">
                    Informasi tidak ada.
                  </span>
                </Match>

                <Match when={kegiatan().length > 0}>
                  <label class="input input-bordered input-sm flex items-center gap-2 w-full sm:w-4/12">
                    <input
                      type="text"
                      class="grow"
                      placeholder="Cari kegiatan..."
                      value={store.cari}
                      onKeyUp={onCariPeralatan}
                    />
                    <Search size={19} />
                  </label>

                  <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mt-2 sm:mt-0">
                    <Show when={store.page > 1}>
                      <li>
                        <button
                          type="button"
                          class="btn btn-sm"
                          classList={{
                            "rounded-e-none": kegiatan().length == limit,
                          }}
                          onClick={prevPage}
                        >
                          <ChevronLeft size={19} />
                        </button>
                      </li>
                    </Show>

                    <Show when={store.selanjutnya}>
                      <li>
                        <button
                          type="button"
                          class="btn btn-sm"
                          classList={{
                            "rounded-s-none": store.page > 1,
                          }}
                          onClick={nextPage}
                        >
                          <ChevronRight size={19} />
                        </button>
                      </li>
                    </Show>
                  </ul>
                </Match>
              </Switch>
            </nav>

            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th scope="col">Peralatan</th>
                    <th scope="col">Instansi</th>
                    <th scope="col">Status</th>
                    <th scope="col">Dibuat</th>
                    <th scope="col">Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  <Switch>
                    <Match when={kegiatan().length > 0}>
                      <For each={kegiatan()}>
                        {(item) => {
                          return (
                            <tr>
                              <th scope="row">{item.peralatan}</th>
                              <td>{item.instansi}</td>
                              <td>
                                <span class="badge badge-accent badge-sm">
                                  {item.arsip ? "arsip" : "aktif"}
                                </span>
                              </td>
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
                                  href={`${item.id.id}/rincian?peralatan=${
                                    item.peralatan
                                  }&instansi=${item.instansi}&kalibrasi=${
                                    item.kalibrasi
                                  }&psatuan=${item.psatuan || "Pa"}&vsatuan=${
                                    item.vsatuan || "m/s"
                                  }&arsip=${item.arsip}`}
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

                    <Match when={kegiatan().length == 0}>
                      <tr>
                        <td scope="row">-</td>
                        <td class="px-6 py-4">-</td>
                        <td class="px-6 py-4">-</td>
                        <td class="px-6 py-4">-</td>
                      </tr>
                    </Match>
                  </Switch>
                </tbody>
              </table>
            </div>
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
}
