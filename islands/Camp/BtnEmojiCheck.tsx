import Icon from "deco-sites/camp-start/components/ui/Icon.tsx";
import { useSignal, useSignalEffect } from "@preact/signals";
import { totalVotes } from "deco-sites/camp-start/sdk/camp/totalVotes.ts";

export interface Props {
  productID: string;
}

export default function BtnEmojiCheck({ productID }: Props) {
  const isChecked = useSignal<boolean>(false);
  const typeIcon = useSignal<"moodCheck" | "moodSmile">("moodSmile");

  const increment = () => {
    isChecked.value = !isChecked.value;
    // totalVotes.value = isChecked.value ? +1 : -1;
    totalVotes.value = totalVotes.value + 1;
    typeIcon.value = isChecked.value ? "moodCheck" : "moodSmile";
  };

  useSignalEffect(() => {
    isChecked.value, typeIcon.value, totalVotes.value;
  });

  return (
    <div class="p-4 border">
      <h1>totalVotes: {totalVotes}</h1>
      <button class="btn bg-transparent" onClick={increment}>
        <Icon
          size={24}
          id={`${typeIcon.value}`}
          strokeWidth={3}
          class="rounded-full"
        />
      </button>
    </div>
  );
}
