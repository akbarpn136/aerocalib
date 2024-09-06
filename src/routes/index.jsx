import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { AppContext } from "../stores";
import Default from "../layouts/default";
import HalamanKosong from "../pages/404";
import HalamanUtama from "../pages/utama";
import { state, setState } from "../stores";
import HalamanRincian from "../pages/rincian";

export default function MainRoutes() {
  const Tentang = lazy(() => import("../pages/tentang"));

  return (
    <AppContext.Provider value={{ state, setState }}>
      <Router>
        <Route path="/" component={Default}>
          <Route path="/" component={HalamanUtama} />
          <Route path="/:id/rincian" component={HalamanRincian} />
          <Route path="/tentang" component={<Tentang />} />
        </Route>
        <Route path="*404" component={HalamanKosong} />
      </Router>
    </AppContext.Provider>
  );
}
