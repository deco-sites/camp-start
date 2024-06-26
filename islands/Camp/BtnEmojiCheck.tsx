import Icon from "deco-sites/camp-start/components/ui/Icon.tsx";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { totalVotes } from "deco-sites/camp-start/sdk/camp/totalVotes.ts";
import { invoke } from "deco-sites/camp-start/runtime.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { sendEvent } from "../../sdk/analytics.tsx";

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

    totalVotesInProduct.value = votesInProduct.product;

    //? usado para atualizar o total de votos no site.
    totalVotes.value = totalVotes.value + 1;

    //^ atualiza o ícone do botão.
    isChecked.value = true;
    typeIcon.value = "moodCheck";

    sendEvent({
      name: "post_score",
      params: {
        character: productID,
        score: totalVotesInProduct.value,
      },
    });
    //^ notifica o usuário.
    notify("Agradeço o voto! Voto computado.");
  };

  const decrement = () => {
    if (totalVotes.value >= 1 && totalVotesInProduct.value >= 1) {
      //^ atualiza o ícone do botão.
      isChecked.value = false;
      typeIcon.value = "moodSmile";

      //^ notifica o usuário.
      // notify("Voto removido!");
    }
  };

  useSignalEffect(() => {
    isChecked.value, typeIcon.value, totalVotesInProduct.value;
    const updateVotes = async () => {
      const votesInProduct = await invoke["deco-sites/camp-start"].loaders.camp
        .getProductVotes({
          productId: productID,
        }) as { product: string };

      // console.log("votesInProduct ===>", Number(votesInProduct.product));

      totalVotesInProduct.value = Number(votesInProduct.product);
    };

    updateVotes();
  });

  effect(() => {
    totalVotes.value;
  });

  const notify = (message: string) => toast.success(message);

  return (
    <div class="p-4 border flex flex-row gap-4">
      <h4>Votos: {totalVotesInProduct.value}</h4>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
