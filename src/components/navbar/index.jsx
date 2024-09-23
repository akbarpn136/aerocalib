import {
  Match,
  Switch,
  useContext,
  createMemo,
  createSignal,
  createEffect,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import { Archive, Plus, Pencil, ArchiveX } from "lucide-solid";

import { AppContext } from "../../stores";
import OlahKegiatan from "../kegiatan/olah";

export default function Navbar() {
  const [path, setPath] = createSignal("");
  const { state, setState } = useContext(AppContext);

  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  const onClickArsip = () => {
    setState("arsipkegiatan", !state.arsipkegiatan);
  };

  createEffect(() => {
    setPath(pathname());
  });

  return (
    <div class="mt-2">
      <div class="inline-flex ml-16 px-4 space-x-2">
        <Switch>
          <Match when={path() == "/"}>
            <div class="tooltip tooltip-right" data-tip="Tambah kegiatan">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick="modal_olah_kegiatan.showModal()"
              >
                <Plus size={19} />
              </button>
            </div>

            <div class="tooltip tooltip-right" data-tip="Arsip kegiatan">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick={onClickArsip}
              >
                <Archive size={19} />
              </button>
            </div>
          </Match>

          <Match when={path().includes("/rincian")}>
            <div class="tooltip tooltip-right" data-tip="Ubah kegiatan">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick="modal_olah_kegiatan.showModal()"
              >
                <Pencil size={19} />
              </button>
            </div>

            <div class="tooltip tooltip-right" data-tip="Arsipkan kegiatan">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick="modal_olah_kegiatan.showModal()"
              >
                <ArchiveX size={19} />
              </button>
            </div>
          </Match>
        </Switch>
      </div>

      <dialog
        id="modal_olah_kegiatan"
        class="modal modal-bottom sm:modal-middle"
      >
        <div class="modal-box space-y-6">
          <h3 class="text-lg font-bold">Olah Kegiatan</h3>

          <OlahKegiatan />
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
