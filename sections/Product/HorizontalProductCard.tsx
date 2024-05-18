import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import Image from "apps/website/components/Image.tsx";
import TextWithImage from "deco-sites/camp-start/sections/Content/TextWithImage.tsx";
import BtnEmojiCheck from "deco-sites/camp-start/islands/Camp/BtnEmojiCheck.tsx";

export interface Props {
  /**
   * @title Detalhes de um produto
   */
  page: ProductDetailsPage | null;

  /**
   * @title Escolha o tamanho máximo de tela
   */
  size?:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  /**
   * @title Ativar animação de zoom in na imagem
   */
  animateImage?: boolean;
}

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div class="p-4">
      <TextWithImage
        services={[
          {
            type: error?.message ?? "Erro ao carregar a página",
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

export function LoadingFallback() {
  return (
    <div class="flex flex-row gap-4 items-center justify-center m-4">
      <img class="skeleton" width={200} height={200} />
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

export default function Section({ page, animateImage, size }: Props) {
  if (!page) {
    return "No page data provided";
  }

  const { product, breadcrumbList } = page;

  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;
  const [image] = images ?? [];
  const { listPrice, price, installments, seller = "1" } = useOffer(offers);
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div
      class={`${
        size ? size : ""
      } flex h-auto flex-col sm:flex-row items-center justify-center gap-4 p-6`}
      id={id}
    >
      <figure class="p-1 overflow-hidden">
        <Image
          class={`rounded-md relative ${
            animateImage
              ? "hover:scale-150 transition-all duration-500 ease-in-out"
              : ""
          } `}
          src={image.url ? image.url : "https://via.placeholder.com/200"}
          alt={name}
          width={200}
          height={279}
          loading={"eager"}
        />
      </figure>
      <div class="flex flex-col gap-4 max-w-72 overflow-hidden">
        <h3 class="card-title">
          {name}
        </h3>
        <p class="text-base text-gray-700 truncate inline-block line-clamp-2">
          {product.description}
        </p>
        {/* emoji check */}
        <BtnEmojiCheck productID={productID} />
      </div>

      <div class="flex flex-col gap-1">
        {/* price */}
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-0 lg:flex-row lg:gap-2  justify-start">
            <div class="line-through text-xs font-light lg:text-sm">
              {`De: ${formatPrice(listPrice, offers?.priceCurrency)}`}
            </div>
            <div class="text-base-content lg:text-sm font-light">
              {`Para: ${formatPrice(price, offers?.priceCurrency)}`}
            </div>
          </div>
        </div>
        <span class="text-base-300 font-light text-sm">
          ou {installments}
        </span>

        {/* buttons */}
        <div class="flex flex-col gap-2 box-border justify-center space-x-4 p-3">
          <a href={url} class="btn" alt={name}>
            Ver produto
          </a>
          <AddToCartButtonVTEX
            productID={productID}
            seller={seller}
            eventParams={{ items: [eventItem] }}
          />
        </div>
      </div>
    </div>
  );
}
