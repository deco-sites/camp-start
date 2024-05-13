import CounterState from "deco-sites/camp-start/islands/PracticesDecoCamp/Counter_State.tsx";
import CounterSignal from "deco-sites/camp-start/islands/PracticesDecoCamp/Counter_Signal.tsx";
import Computed from "deco-sites/camp-start/islands/PracticesDecoCamp/Computed.tsx";

export default function SectionPractice() {
  return (
    <section class="p-16">
      <h2 class="p-2">Practice</h2>
      <CounterState />
      <br />
      <CounterSignal />
      <br />
      <Computed />
      <p class="p-2">Practice makes perfect.</p>
    </section>
  );
}
