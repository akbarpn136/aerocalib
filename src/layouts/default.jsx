import { Match, Switch, Suspense, useContext, createResource } from "solid-js";

import { AppContext } from "../stores";
import Navbar from "../components/navbar";
import { initDb } from "../lib/configs/db";
import Sidebar from "../components/sidebar";
import ToastSalah from "../components/toast/salah";

export default function Default(props) {
  const { _, setState } = useContext(AppContext);

  const connDb = async () => {
    const conn = await initDb();

    setState("surreal", conn);

    return conn;
  };

  const [db] = createResource(connDb);

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div class="ml-16 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Match when={db.error}>
              <ToastSalah pesan={db.error.message} />
            </Match>
          </Switch>
        </Suspense>

        {props.children}
      </div>
    </div>
  );
}
