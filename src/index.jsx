/* @refresh reload */
import { lazy } from "solid-js"
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"
import { createStore } from "solid-js/store"

import "./styles.css"
import RouterKegiatan from "./routers/kegiatan"
import DefaultLayout from "./layouts/default"
import { StateUtama, ContextUtama } from "./stores/utama"

render(() => {
    const [state, setState] = createStore(StateUtama)

    return <ContextUtama.Provider value={{ state, setState }}>
        <Router root={DefaultLayout}>
            <RouterKegiatan />
            <Route path="/login" component={lazy(() => import("./pages/login.jsx"))} />
            <Route path="/" component={lazy(() => import("./pages/utama.jsx"))} />
            <Route path="*404" component={lazy(() => import("./pages/404.jsx"))} />
        </Router>
    </ContextUtama.Provider>
}, document.getElementById("root"))
