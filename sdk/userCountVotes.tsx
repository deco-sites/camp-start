import { signal } from "@preact/signals";
import { invoke } from "deco-sites/camp-start/runtime.ts";

export const userCount = signal<number>(0);

export const updateVote = async (productId: string) => {
  const response = await invoke({
    key: "site/loaders/Votes/PostVotes.tsx",
    props: { productId },
  });

  return response.product;
};
