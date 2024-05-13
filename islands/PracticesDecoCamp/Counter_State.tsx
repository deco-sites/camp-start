import { useEffect, useMemo, useState } from "preact/hooks";

export default function CounterState() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  //? roda toda vez que o count é alterado
  // useEffect(() => {
  //   alert("Incrementou!");
  // }, [count]);

  //? roda apenas uma vez quando o componente é montado
  // useEffect(() => {
  //   alert("Acabei de ser montado!");
  // }, []);

  //* useMemo
  const [number, setNumber] = useState(0);

  const handleChange = (e: number) => {
    setNumber(e);
  };

  //? roda toda vez que a página é alterada, mesmo que o valor não seja alterado
  // const doubleNumber = (num: number): number => {
  //   console.log("Calculando...");
  //   return num * 2;
  // };

  //? useMemo é usado para memorizar valores, ele só é recalculado quando o valor de number é alterado
  const doubleNumber = useMemo(() => {
    console.log("Calculando...");
    return number * 2;
  }, [number]);

  return (
    <div class="p-4 rounded-xl border">
      <h3 class="text-2xl font-bold">useState Hooks</h3>
      <h3 class="text-lg font-bold">useState</h3>
      <p>Você clicou: {count}</p>
      <button class="btn btn-primary" onClick={increment}>Increment</button>
      {/* <button onClick={() => setCount(count - 1)}>Decrement</button> */}

      <h3 class="text-lg font-bold">useMemo</h3>
      <p>O valor atual é: {number}</p>
      <p>O dobro do valor é: {doubleNumber}</p>
      {/* <p>O dobro do valor é: {number}</p> */}
      <input
        type="text"
        value={number}
        onInput={(e) => {
          handleChange(parseInt(e.currentTarget.value));
        }}
      />
    </div>
  );
}
