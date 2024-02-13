import "flowbite"

import SimpleNavbar from "../components/navbar"
import SimpleSidebar from "../components/sidebar"

function DefaultLayout(props) {
    return <>
        <SimpleNavbar />

        <SimpleSidebar />

        {props.children}
    </>
}

export default DefaultLayout
