export default function fullwidth(props) {
    return <section class="bg-white dark:bg-gray-900 bg-[url('lightpattern.svg')] dark:bg-[url('darkpattern.svg')]">
        <div class="flex h-screen">
            {props.children}
        </div>
    </section>
}