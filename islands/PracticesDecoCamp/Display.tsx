import { userCount } from "deco-sites/camp-start/sdk/PracticesDecoCamp/userCount.tsx";

export default function Display() {
  return (
    <div class="p-4 rounded-xl border my-5">
      <h1 class="text-2xl font-bold">Display: Signal</h1>
      <p>sdk/userCount</p>
      <p>Você clicou {userCount.value} vezes</p>
    </div>
  );
}
