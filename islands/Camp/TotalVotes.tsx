import Icon from "deco-sites/camp-start/components/ui/Icon.tsx";
import { totalVotes } from "deco-sites/camp-start/sdk/camp/totalVotes.ts";
// import { effect } from "@preact/signals";

export default function TotalVotes() {
  // console.log("totalVotes in header ===>", totalVotes);

  // effect(() => {
  // });

  return (
    <div class="bg-slate-400 p-1 flex flex-row-reverse items-center text-center justify-items-center justify-center gap-2">
      <h1 class="text-base">Total de votos: {totalVotes}</h1>
      <span>
        <Icon
          size={24}
          id="friends"
          strokeWidth={3}
        />
      </span>
    </div>
  );
}
