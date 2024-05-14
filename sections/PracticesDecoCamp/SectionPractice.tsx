import IslandExample from "deco-sites/camp-start/islands/PracticesDecoCamp/IslandExample.tsx";
import Display from "deco-sites/camp-start/islands/PracticesDecoCamp/Display.tsx";
import Grouped from "deco-sites/camp-start/islands/PracticesDecoCamp/Grouped.tsx";
import Nested from "deco-sites/camp-start/islands/PracticesDecoCamp/Nested.tsx";

// referência https://preactjs.com/guide/v10/signals#introduction
export default function SectionPractice() {
  return (
    <section class="p-16">
      <h2 class="p-2">Practice</h2>
      <IslandExample />
      <br />
      <Display />
      <br />
      <Grouped />
      <br />
      <Nested />
      <p class="p-2">Practice makes perfect.</p>
    </section>
  );
}
