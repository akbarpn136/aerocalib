import "flowbite"

import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function Default(props) {
    return <div class="">
        <Navbar />

        <Sidebar />

        <div class="p-4 sm:ml-64">
            {props.children}
        </div>
    </div>
}
