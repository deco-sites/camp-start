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
  const totalVotesInProduct = useSignal<number>(0);

  const increment = async () => {
    //? adiciona o produto ao total de votos na API.
    const votesInProduct = await invoke["deco-sites/camp-start"].actions.camp
      .postVoteProduct({
        productId: productID,
      }) as { product: number; total: number };

    // console.log("votesInProduct ===>", votesInProduct.product);

    totalVotesInProduct.value = votesInProduct.product;

    //? usado para atualizar o total de votos no site.
    totalVotes.value = totalVotes.value + 1;
    // console.log(
    //   "increment totalVotesInProduct ===>",
    //   totalVotesInProduct.value,
    // );

    //^ atualiza o ícone do botão.
    isChecked.value = true;
    typeIcon.value = "moodCheck";
  };

  const decrement = () => {
    if (totalVotes.value >= 1 && totalVotesInProduct.value >= 1) {
      totalVotes.value = totalVotes.value - 1;
      totalVotesInProduct.value = totalVotesInProduct.value - 1;
    }

    // console.log(
    //   "decrement totalVotesInProduct ===>",
    //   totalVotesInProduct.value,
    // );

    //^ atualiza o ícone do botão.
    isChecked.value = false;
    typeIcon.value = "moodSmile";
  };

  useSignalEffect(() => {
    isChecked.value,
      typeIcon.value,
      totalVotes.value,
      totalVotesInProduct.value;
  });

  return (
    <div class="p-4 border flex flex-row gap-4">
      <h4>totalVotes: {totalVotesInProduct.value}</h4>
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
