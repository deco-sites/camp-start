import Counter from "../../islands/VotesBtn/Counter.tsx";

export interface Props {
  votes: number;
}

export default function ProductVotes({ votes }: Props) {
  return (
    <div class="flex flex-row gap-1 items-center">
      <span class="text-xs text-gray-500">Votes: {votes}</span>
      <Counter />
    </div>
  );
}
