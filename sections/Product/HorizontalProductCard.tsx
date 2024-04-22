import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function Section({ page }: Props) {
  if (!page) {
    return null;
  }

  const { product } = page;
  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;
  const [image] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  return (
    <div class="flex flex-row gap-4 items-center justify-center m-4">
      <figure>
        <Image src={image.url} alt={name} width={200} height={279} />
      </figure>
      <div class="flex flex-col gap-1 items-center text-base lg:text-lg text-base-content">
        <h3 class="uppercase font-normal">{name}</h3>
        <div class="">{product.description}</div>
        <div class="">Preço: ${formatPrice(price)}</div>
        <div class="flex flex-row gap-1">
          <a href={url} class="btn bg-blue-400" alt={name}>Ver produto</a>
          <button class="btn">Comprar</button>
        </div>
      </div>
    </div>
  );
}
