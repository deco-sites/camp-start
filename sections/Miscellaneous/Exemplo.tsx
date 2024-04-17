export interface Props {
  text: string;
}

export default function Exemplo({ text }: Props) {
  return (
    <div class="m-4">
      <h2 class="p-4">{text}</h2>
    </div>
  );
}
