import "flowbite"

import SimpleNavbar from "./components/navbar"
import SimpleSidebar from "./components/sidebar"

function App() {
    return <>
        <SimpleNavbar />

        <SimpleSidebar />

        <div class="p-4 sm:ml-64">
            <div class="p-4 mt-14">
                <p>INI HALAMAN UTAMA.</p>
            </div>
        </div >
    </>
}

export default App
