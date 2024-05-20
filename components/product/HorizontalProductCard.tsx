import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import Image from "apps/website/components/Image.tsx";
import BtnEmojiCheck from "deco-sites/camp-start/islands/Camp/BtnEmojiCheck.tsx";

export interface Props {
  /** @title Produto com dados vindo da página */
  page?: ProductDetailsPage | null;
  /** @title Produto com dados vindo de produtos relacionados*/
  products?: Product[] | null;

  /** @title Local de exibição do produto */
  localOfExhibition: "page" | "products";

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

export default function Section(
  { page, animateImage, size, products, localOfExhibition }: Props,
) {
  let productInUse;

  if (localOfExhibition === "products") {
    console.log("products =>", true);
    if (!products) {
      return "No product data provided";
    }
    productInUse = products[0];
  } else {
    console.log("page =>", true);

    if (!page) {
      return "No page data provided";
    }
    productInUse = page?.product;
  }

  const { url, productID, name, image: images, offers } = productInUse;
  const id = `product-card-${productID}`;
  const [image] = images ?? [];
  const { listPrice, price, installments, seller = "1" } = useOffer(offers);
  // const breadcrumb = {
  //   ...breadcrumbList,
  //   itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
  //   numberOfItems: breadcrumbList.numberOfItems - 1,
  // };

  const eventItem = mapProductToAnalyticsItem({
    product: productInUse,
    // breadcrumbList: breadcrumb,
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
          {productInUse.description}
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
