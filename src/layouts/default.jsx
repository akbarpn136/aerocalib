import "flowbite";
import { Show, onMount, useContext, createSignal } from "solid-js";

import { initDb } from "../configs/db";
import { AppContext } from "../stores";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import ToastSalah from "../components/toast/salah";

export default function Default(props) {
  const [pesan, setPesan] = createSignal("");
  const [salah, setSalah] = createSignal(false);

  const { _, setState } = useContext(AppContext);

  onMount(async () => {
    try {
      const conn = await initDb();

      setState("surreal", conn);
    } catch (err) {
      setPesan(err.message);
      setSalah(true);
    }
  });

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div class="p-4 sm:ml-64">
        <Show when={salah()}>
          <ToastSalah pesan={pesan()} />
        </Show>

        {props.children}
      </div>
    </div>
  );
}
