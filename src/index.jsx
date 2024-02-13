/* @refresh reload */
import { render } from "solid-js/web"
import { Router } from "@solidjs/router"

import "./styles.css"
import DefaultLayout from "./layouts/default"
import { routes } from "./routers/routes"

render(() => <Router root={DefaultLayout}>{routes}</Router>, document.getElementById("root"))
