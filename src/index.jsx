/* @refresh reload */
import { render } from "solid-js/web";

import "./styles/index.css";
import MainRoutes from "./routes";

const dispose = render(() => <MainRoutes />, document.getElementById("root"));

if (import.meta.hot) {
  import.meta.hot.dispose(dispose);
}
