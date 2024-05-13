import { effect, signal, useSignal, useSignalEffect } from "@preact/signals";

const outSideCount = signal(0);

//* função usada no lado de fora do componente
effect(() => {
  console.log(`effect incrementou: ${outSideCount.value}`);
});

export default function CounterSignal() {
  const count = useSignal(0);

  //? no signal ele não re-renderiza a página inteira, ele entende que é para alterar apenas o elemento que foi modificado
  const increment = () => {
    count.value++;
  };

  //? no effect ele não precisa de um array de dependências, ele roda toda vez que o valor de count é alterado
  // ele é equivalente ao useEffect com o count como dependência
  // ele roda quando a página é montada a primeira vez e tambem roda quando é montada no lado do sever/servidor

  //* função usada no lado de dentro do componente
  useSignalEffect(() => {
    console.log(`useSignalEffect incrementou: ${count.value}`);
  });

  const incrementEffect = () => {
    outSideCount.value++;
  };
  return (
    <div class="p-4 rounded-xl border">
      <h3 class="text-2xl font-bold">Signals</h3>
      <p>Você clicou: {count.value}</p>
      <p>Você clicou: {outSideCount.value}</p>
      <button class="btn btn-primary" onClick={increment}>
        Increment useSignalEffect
      </button>
      <button class="btn" onClick={incrementEffect}>Increment Effect</button>
    </div>
  );
}
