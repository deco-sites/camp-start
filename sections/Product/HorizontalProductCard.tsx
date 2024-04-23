import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Image from "apps/website/components/Image.tsx";
import TextWithImage from "deco-sites/camp-start/sections/Content/TextWithImage.tsx";

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

  const { product } = page;

  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;
  const [image] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  return (
    <div
      class={`${
        size ? size : ""
      } flex h-auto flex-row items-center justify-center gap-4 p-6 min-w-0 truncate`}
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
      <div class="flex flex-col gap-4 min-w-0 truncate">
        <h3 class="card-title truncate inline-block min-w-0">{name}</h3>
        <p class="text-base text-gray-700 truncate inline-block min-w-0">
          {product.description}
        </p>
        {/* price */}
        <div class="leading-none text-gray-900">
          Preço: ${formatPrice(price)}
        </div>

        {/* buttons */}
        <div class="flex flex-row box-border justify-center space-x-4 p-3">
          <a href={url} class="btn btn-primary p-2" alt={name}>
            Ver produto
          </a>
          <button class="btn p-2 m-1">Comprar</button>
        </div>
      </div>
    </div>
  );
}

{
  /* <div class="">
  <figure >
    <image class="rounded h-52 w-52 object-cover" src="https://via.placeholder.com/200" alt="name" loading="eager" />
  </figure>

  <div class="flex flex-col gap-4 truncate">
    <h3 class="card-title truncate ...">namenamenamenamenamenamenamenamenamenamenamename</h3>
    <p class="truncate text-base text-gray-700">product.descriptionproduct.descriptionproduct.descriptionproduct.descriptionproduct.description</p>

    <div class="leading-none text-gray-900">Preço: $22.90</div>
    <div class="flex flex-row justify-center gap-4">
      <a class="btn btn-primary w-fit">Ver produto</a>
      <button class="btn w-fit">Comprar</button>
    </div>
  </div>
</div> */
}
