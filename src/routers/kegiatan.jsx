import { lazy } from "solid-js"
import { Route } from "@solidjs/router"

export default function RouterKegiatan() {
    return <Route path="/kegiatan">
        <Route path="/:id" component={lazy(() => import("../pages/kegiatan/rincian.jsx"))} />
    </Route>
}