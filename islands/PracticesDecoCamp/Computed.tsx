import { computed, effect, signal } from "@preact/signals";

//? usado para pegar um evento do lado de fora do componente
const userInput = signal("");
const count = signal(0);
const upperCaseInput = computed(() => userInput.value.toUpperCase());

//? esse valor é recalculado toda vez que o valor de userInput ou count é alterado
const output = computed(() =>
  userInput.value.toUpperCase() + " " + count.value
);

effect(() => {
  // console.log(`original input: ${userInput.value}`);
  // console.log(`Uppercase input: ${upperCaseInput.value}`);
  console.log(`Output: ${output.value}`);
  console.log("=====================================");
});

const increment = () => {
  count.value++;
};

export default function Computed() {
  return (
    <div class="p-4 rounded-xl border">
      <h3 class="text-2xl font-bold">Computed</h3>
      <input
        type="text"
        value={userInput.value}
        onChange={(e) => {
          userInput.value = e.currentTarget.value;
        }}
      />
      <p>Original input: {userInput.value}</p>
      <p>Uppercase input: {upperCaseInput.value}</p>
      <p>output: {output.value}</p>
      <button class="btn btn-primary" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
