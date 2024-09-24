import {
  Match,
  Switch,
  Suspense,
  useContext,
  createResource,
  lazy,
} from "solid-js";

import { AppContext } from "../stores";
import { initDb } from "../lib/configs/db";

export default function Default(props) {
  const NavbarComponent = lazy(() => import("../components/navbar"));
  const SidebarComponent = lazy(() => import("../components/sidebar"));
  const ToastSalahComponent = lazy(() => import("../components/toast/salah"));

  const { _, setState } = useContext(AppContext);

  const connDb = async () => {
    const conn = await initDb();

    setState("surreal", conn);

    return conn;
  };

  const [db] = createResource(connDb);

  return (
    <div>
      <NavbarComponent />

      <SidebarComponent />

      <div class="ml-16 p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Match when={db.error}>
              <ToastSalahComponent pesan={db.error.message} />
            </Match>
          </Switch>
        </Suspense>

        {props.children}
      </div>
    </div>
  );
}
