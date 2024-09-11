import {
  Show,
  Match,
  Switch,
  useContext,
  createSignal,
  createEffect,
} from "solid-js";
import { Archive, Menu, Plus, Pencil, ArchiveX } from "lucide-solid";
import { useLocation } from "@solidjs/router";

import { AppContext } from "../../stores";
import OlahKegiatan from "../kegiatan/olah";

export default function Navbar() {
  const { state, setState } = useContext(AppContext);
  const [showModal, setShowModal] = createSignal(false);
  const [path, setPath] = createSignal("");

  const location = useLocation();

  const onClickArsip = () => {
    setState("arsipkegiatan", !state.arsipkegiatan);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  createEffect(() => {
    setPath(location.pathname);
  });

  return (
    <div class="mt-2">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center ms-4 px-4 py-2 text-sm shadow-sm border border-gray-200 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>

        <Menu size={19} />
      </button>

      <div class="inline-flex mx-2 sm:ml-16 sm:px-4">
        <div class="inline-flex items-center rounded-md shadow-sm" role="group">
          <Switch>
            <Match when={path() == "/"}>
              <button
                data-tooltip-target="tooltip-tambah-kegiatan"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:focus:text-white"
                onClick={onShowModal}
              >
                <Plus size={19} />
              </button>
              <div
                id="tooltip-tambah-kegiatan"
                role="tooltip"
                class="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Tambah kegiatan
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button
                data-tooltip-target="tooltip-muat-kegiatan"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:focus:text-white"
                onClick={onClickArsip}
              >
                <Archive size={19} />
              </button>
              <div
                id="tooltip-muat-kegiatan"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Arsip kegiatan
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </Match>

            <Match when={path().includes("/rincian")}>
              <button
                data-tooltip-target="tooltip-ubah-kegiatan"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:focus:text-white"
                onClick={onShowModal}
              >
                <Pencil size={19} />
              </button>
              <div
                id="tooltip-ubah-kegiatan"
                role="tooltip"
                class="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Ubah kegiatan
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button
                data-tooltip-target="tooltip-arsipkan-kegiatan"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:focus:text-white"
                onClick={onClickArsip}
              >
                <ArchiveX size={19} />
              </button>
              <div
                id="tooltip-arsipkan-kegiatan"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Arsipkan kegiatan
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>

      <Show when={showModal()}>
        <OlahKegiatan setmodal={setShowModal} />
        <div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40" />
      </Show>
    </div>
  );
}
