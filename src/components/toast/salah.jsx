import { X, CircleAlert } from "lucide-solid";
import { Show, createSignal } from "solid-js";

export default function ToastSalah(props) {
  const [muncul, setMuncul] = createSignal(true);
  const [sembunyi, setSembunyi] = createSignal(false);
  const [transisi, setTransisi] = createSignal(false);

  const onBtnClick = () => {
    setTransisi(true);

    setInterval(() => {
      setSembunyi(true);
      setMuncul(false);
    }, 500);
  };

  return (
    <Show when={muncul()}>
      <div
        class="toast"
        classList={{
          hidden: sembunyi(),
          "transition-opacity duration-500 ease-out opacity-0": transisi(),
        }}
        role="alert"
      >
        <div class="alert alert-info w-72 sm:w-96">
          <CircleAlert size={19} />

          <article class="prose text-wrap text-xs">
            <p>{props.pesan}</p>
          </article>

          <button
            type="button"
            class="btn btn-ghost btn-sm"
            aria-label="Close"
            onClick={onBtnClick}
          >
            <span class="sr-only">Close</span>
            <X size={19} />
          </button>
        </div>
      </div>
    </Show>
  );
}
