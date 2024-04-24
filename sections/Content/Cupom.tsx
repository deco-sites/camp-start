export interface Props {
  codeCupom: string;
  description: string;
}

export default function Cupom({ codeCupom, description }: Props) {
  return (
    <div className="container border-2 border-orange-300 border-dotted rounded-lg w-2/5 p-4 my-8">
      <h2 className="text-lg font-semibold text-gray-800">{codeCupom}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
