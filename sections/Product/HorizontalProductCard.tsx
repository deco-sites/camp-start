import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  myProduct: {
    image: ImageWidget;
    name: string;
    price: number;
    description: string;
    textBtn: string;
  };
}

export default function Section({ myProduct }: Props) {
  return (
    <div class="flex flex-row sm:flex-col gap-4 items-center m-4">
      <figure>
        <img
          width="200"
          height="279"
          src={myProduct.image}
          alt={myProduct.name}
        />
      </figure>
      <div class="flex flex-col gap-1 items-center">
        <h3 class="text-xl">{myProduct.name}</h3>
        <div class="text-sm">{myProduct.description}</div>
        <div class="text-sm">Preço: ${myProduct.price}</div>
        <button class="btn">{myProduct.textBtn}</button>
      </div>
    </div>
  );
}
