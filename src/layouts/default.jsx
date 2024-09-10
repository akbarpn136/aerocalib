import "flowbite";
import { Show, onMount, useContext } from "solid-js";

import { initDb } from "../lib/configs/db";
import { AppContext } from "../stores";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import ToastSalah from "../components/toast/salah";
import { produce } from "solid-js/store";

export default function Default(props) {
  const { state, setState } = useContext(AppContext);

  onMount(async () => {
    try {
      const conn = await initDb();

      setState("surreal", conn);
    } catch (err) {
      setState(
        "keliru",
        produce((payload) => {
          payload.benarkah = true;
          payload.pesan = err.message;
        })
      );
    }
  });

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div class="p-4 sm:ml-64">
        <Show when={state.keliru.benarkah}>
          <ToastSalah />
        </Show>

        {props.children}
      </div>
    </div>
  );
}
