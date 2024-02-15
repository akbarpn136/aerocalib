import "flowbite"

import SimpleNavbar from "../components/navbar"
import SimpleSidebar from "../components/sidebar"

function DefaultLayout(props) {
    return <>
        <SimpleNavbar />

        <SimpleSidebar />

        <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
            {props.children}
            <div class="bg-gradient-to-t from-gray-100 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    </>
}

export default DefaultLayout
