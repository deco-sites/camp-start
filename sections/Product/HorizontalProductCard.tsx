import type { Product } from "apps/commerce/types.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Listagem de produtos */
  products: Product[] | null;
}

export default function Section({ products }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      {products.map((product, index) => (
        <div>
          {product.name}
        </div>
      ))}
    </div>
  );
  //   return (
  //     <div class="flex flex-row sm:flex-col gap-4 items-center m-4">
  //       {
  //         /* <figure>
  //         <img
  //           width="200"
  //           height="279"
  //           src={myProduct.image}
  //           alt={myProduct.name}
  //         />
  //       </figure>
  //       <div class="flex flex-col gap-1 items-center">
  //         <h3 class="text-xl">{myProduct.name}</h3>
  //         <div class="text-sm">{myProduct.description}</div>
  //         <div class="text-sm">Preço: ${myProduct.price}</div>
  //         <button class="btn">{myProduct.textBtn}</button>
  //       </div> */
  //       }
  //     </div>
  //   );
}
