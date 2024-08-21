import { lazy } from "solid-js"
import { Router, Route } from "@solidjs/router"

import Default from "../layouts/default"
import HalamanUtama from "../pages/utama"
import HalamanKosong from "../pages/404"

export default function MainRoutes() {
    const Arsip = lazy(() => import("../pages/arsip"))
    const Tentang = lazy(() => import("../pages/tentang"))
    const Rincian = lazy(() => import("../pages/rincian"))

    return <Router>
        <Route path="/" component={Default}>
            <Route path="/" component={HalamanUtama} />
            <Route path="/:id/rincian" component={<Rincian />} />
            <Route path="/arsip" component={<Arsip />} />
            <Route path="/tentang" component={<Tentang />} />
        </Route>
        <Route path="*404" component={HalamanKosong} />
    </Router>
}