import { useSignal } from "@preact/signals";
import Icon from "deco-sites/camp-start/components/ui/Icon.tsx";

export default function Counter() {
  const count = useSignal(0);

  const increment = () => {
    count.value++;
  };

  return (
    <div class="p-4 border">
      <h1>Cliques: {count.value}</h1>
      <button class="btn bg-transparent" onClick={increment}>
        <Icon size={24} id="moodSmile" strokeWidth={3} />
      </button>
    </div>
  );
}
