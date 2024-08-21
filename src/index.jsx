/* @refresh reload */
import { render } from "solid-js/web"

import "./index.css"
import MainRoutes from "./routes"

render(() => <MainRoutes />, document.getElementById("root"))
