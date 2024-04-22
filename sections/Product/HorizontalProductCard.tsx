import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Image from "apps/website/components/Image.tsx";
import TextWithImage from "deco-sites/camp-start/sections/Content/TextWithImage.tsx";

export interface Props {
  page: ProductDetailsPage | null;
}

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div class="p-4">
      <TextWithImage
        services={[
          {
            type: "Cultura",
            label: "Carnaval",
            description:
              "O carnaval é uma festa de muitas tradições. Uma das mais conhecidas é o desfile de escolas de samba, que acontece no Rio de Janeiro e em São Paulo. As escolas são compostas por comunidades que se preparam durante todo o ano para apresentar um espetáculo de música, dança e fantasia na avenida. Além disso, há também os blocos de rua, que são grupos de pessoas que se reúnem para dançar e cantar pelas ruas da cidade.",
            image:
              "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4756/f6d95808-634b-49e3-9c36-29b8939e3378",
            placement: "left",
          },
        ]}
      />
      <a href="/culturas" class="btn flex justify-center m-4">Saiba mais</a>
    </div>
  );
}

export function ErrorLoadingFallback() {
  return (
    <div class="flex flex-row gap-4 items-center justify-center m-4">
      <div class="skeleton" style="width: 200; height:279;"></div>
      <div class="flex flex-col gap-1 items-center text-base lg:text-lg text-base-content">
        <h3 class="w-full h-7">Loading...</h3>
        <div class="skeleton w-full h-4" />

        {/* price */}
        <div class="skeleton w-full h-4" />

        {/* buttons */}
        <div class="flex flex-row gap-1">
          <div class="skeleton w-full h-12" />
          <div class="skeleton w-full h-12" />
        </div>
      </div>
    </div>
  );
}

export default function Section({ page }: Props) {
  if (!page) {
    return <ErrorFallback />;
  }

  const { product } = page;

  if (!product) {
    return <ErrorLoadingFallback />;
  }
  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;
  const [image] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  return (
    <div class="flex flex-row gap-4 items-center justify-center m-4" id={id}>
      <figure>
        <Image src={image.url} alt={name} width={200} height={279} />
      </figure>
      <div class="flex flex-col gap-1 items-center text-base lg:text-lg text-base-content">
        <h3 class="uppercase font-normal">{name}</h3>
        <div class="">{product.description}</div>
        {/* price */}
        <div class="">Preço: ${formatPrice(price)}</div>

        {/* buttons */}
        <div class="flex flex-row gap-1">
          <a href={url} class="btn bg-blue-400" alt={name}>Ver produto</a>
          <button class="btn">Comprar</button>
        </div>
      </div>
    </div>
  );
}
