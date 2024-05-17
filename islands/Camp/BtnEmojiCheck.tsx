import Icon from "deco-sites/camp-start/components/ui/Icon.tsx";
import { useSignal, useSignalEffect } from "@preact/signals";
import { totalVotes } from "deco-sites/camp-start/sdk/camp/totalVotes.ts";
import { invoke } from "deco-sites/camp-start/runtime.ts";
export interface Props {
  productID: string;
}

export default function BtnEmojiCheck({ productID }: Props) {
  const isChecked = useSignal<boolean>(false);
  const typeIcon = useSignal<"moodCheck" | "moodSmile">("moodSmile");

  const increment = async () => {
    isChecked.value = true;
    // totalVotes.value = totalVotes.value + 1;

    const votesInProduct = await invoke["deco-sites/camp-start"].loaders.camp
      .postVoteProduct({
        productID: productID,
      });
    // console.log("votesInProduct ===>", votesInProduct.total);

    // totalVotes.value = votesInProduct.total;

    typeIcon.value = "moodCheck";
  };

  const decrement = () => {
    isChecked.value = false;

    if (totalVotes.value >= 1) {
      totalVotes.value = totalVotes.value - 1;
    }
    typeIcon.value = "moodSmile";
  };

  useSignalEffect(() => {
    isChecked.value, typeIcon.value, totalVotes.value;
  });

  return (
    <div class="p-4 border">
      <h1>totalVotes: {totalVotes.value}</h1>
      <button
        class="btn bg-transparent"
        onClick={isChecked.value ? decrement : increment}
      >
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
