import { signal } from "@preact/signals";
// import { invoke } from "deco-sites/camp-start/runtime.ts";

export const totalVotes = signal<number>(0);

// const updateVotes = async () => {
//   const allVotes = await invoke["deco-sites/camp-start"].loaders.camp
//     .getTotalVotes() as { total: number };

//   //? Atualiza o total de votos.
//   totalVotes.value = allVotes.total;

//   // console.log("total de votos no site ===>", allVotes.total);
// };

// //? Atualiza o total de votos ao carregar a página.
// updateVotes();

// //? Atualiza o total de votos a cada 30 segundos.
// setInterval(updateVotes, 30000);
