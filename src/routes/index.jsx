import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { AppContext } from "../stores";
import { state, setState } from "../stores";

export default function MainRoutes() {
  const PageKosong = lazy(() => import("../pages/404"));
  const PageTentang = lazy(() => import("../pages/tentang"));
  const PageUtama = lazy(async () => import("../pages/utama"));
  const PageRincian = lazy(async () => import("../pages/rincian"));

  const LayoutUtama = lazy(async () => import("../layouts/default"));

  return (
    <AppContext.Provider value={{ state, setState }}>
      <Router>
        <Route path="/" component={LayoutUtama}>
          <Route path="" component={PageUtama} />
          <Route path="/:id/rincian" component={PageRincian} />
          <Route path="/tentang" component={PageTentang} />
        </Route>

        <Route path="*404" component={PageKosong} />
      </Router>
    </AppContext.Provider>
  );
}
