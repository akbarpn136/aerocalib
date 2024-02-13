import { lazy } from "solid-js"

export const routes = [
    {
        path: "/kegiatan",
        component: lazy(() => import("../pages/kegiatan.jsx")),
    },
    {
        path: "/",
        component: lazy(() => import("../pages/utama.jsx")),
    },
    {
        path: "*404",
        component: lazy(() => import("../pages/404.jsx")),
    },
]