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
  /** @title Escolha a quantidade mínima de imagens para renderizar na seção */
  /** @minimum 3 */
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
    <div class="flex flex-col justify-center">
      <h2 class="text-base text-center">{title}</h2>
      <div class="flex flex-row justify-center gap-3">
        {images.slice(initialOfImgs, limitOfImgs).map((
          { image, titleImage, alt },
        ) => (
          <div class="flex flex-col gap-2">
            <Image
              src={image}
              alt={alt}
              width={200}
              height={200}
              preload
              loading="eager"
            />
            {titleImage && <h3 class="text-sm font-bold p-4">{titleImage}</h3>}
          </div>
        ))}
        {images.length > limitOfImgs && (
          <button
            className="btn btn-primary"
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
            className="btn btn-primary"
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
    </div>
  );
}
