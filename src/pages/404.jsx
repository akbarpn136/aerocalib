import { Info404 } from "../components/info"

export default function HalamanUtama() {
    return <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
        <Info404 />
        <div class="bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
}