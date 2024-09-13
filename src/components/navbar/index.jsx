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
      <div class="inline-flex ml-16 px-4 gap-x-2">
        <Switch>
          <Match when={path() == "/"}>
            <div class="tooltip tooltip-right" data-tip="Tambah kegiatan">
              <button type="button" class="btn btn-sm" onClick={onShowModal}>
                <Plus size={19} />
              </button>
            </div>

            <div class="tooltip tooltip-right" data-tip="Arsip kegiatan">
              <button type="button" class="btn btn-sm" onClick={onClickArsip}>
                <Archive size={19} />
              </button>
            </div>
          </Match>

          <Match when={path().includes("/rincian")}>
            <div class="tooltip tooltip-right" data-tip="Ubah kegiatan">
              <button type="button" class="btn btn-sm" onClick={onShowModal}>
                <Pencil size={19} />
              </button>
            </div>

            <div class="tooltip tooltip-right" data-tip="Arsipkan kegiatan">
              <button type="button" class="btn btn-sm" onClick={onShowModal}>
                <ArchiveX size={19} />
              </button>
            </div>
          </Match>
        </Switch>
      </div>

      <Show when={showModal()}>
        <OlahKegiatan setmodal={setShowModal} />
        <div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40" />
      </Show>
    </div>
  );
}
