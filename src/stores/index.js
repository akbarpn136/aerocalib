import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const AppContext = createContext();

export const [state, setState] = createStore({
  kegiatanid: null,
  sensorid: null,
  surreal: null,
});
