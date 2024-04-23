import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Escolha o Título desta Seção */
  title: string;

  /** @title Escolha as imagens para renderizar na seção */
  /** @description exibição de 3 imagens na tela, com a possibilidade de ter mais renderizações ao passar de 3 imagens */
  images: {
    image: ImageWidget;
    alt: string;
    titleImage?: string;
  }[];
  /** @title Escolha a quantidade de imagens para renderizar na seção, até 6 imagens. */
  /** @mmaximum 6 */
  limitOfImgs: number;

  /**@hide */
  initialOfImgs: number;
}

export default function PartialImageGallery(
  { title, images, limitOfImgs, initialOfImgs = 0 }: Props,
) {
  // reseta a contagem, para que o slice funcione em 3 imagens
  // if (limitOfImgs === images.length || limitOfImgs == 3) {
  //   limitOfImgs = 3;
  //   initialOfImgs = 0;
  // }

  return (
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-xl font-bold text-center p-3 m-3">{title}</h2>
      <div class="flex flex-row justify-center gap-4">
        {images.slice(initialOfImgs, limitOfImgs).map((
          { image, titleImage, alt },
        ) => (
          <div class="flex flex-col gap-2">
            <figure class="overflow-hidden p-1">
              <Image
                className="rounded-lg hover:scale-150 duration-500 ease-in-out"
                src={image}
                alt={alt}
                width={200}
                height={200}
                preload
                loading="eager"
              />
            </figure>
            {titleImage && (
              <h3 class="text-sm text-center font-bold p-4">{titleImage}</h3>
            )}
          </div>
        ))}
      </div>
      {images.length > limitOfImgs && (
        <button
          className="btn btn-primary w-fit justify-center"
          {...usePartialSection({
            mode: "replace",
            props: {
              limitOfImgs: limitOfImgs + 1,
              // initialOfImgs: initialOfImgs + 1,
            },
          })}
        >
          Ver mais
        </button>
      )}

      {images.length === limitOfImgs && (
        <button
          className="btn"
          {...usePartialSection({
            mode: "replace",
            props: {
              limitOfImgs: 3,
              initialOfImgs: 0,
            },
          })}
        >
          Voltar ao início
        </button>
      )}
    </div>
  );
}
