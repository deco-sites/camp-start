import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  codeCupom: string;
  description: string;
  image?: ImageWidget;
}

export default function Cupom({ codeCupom, description, image }: Props) {
  return (
    <div className="container border-2 border-orange-300 border-dotted rounded-lg w-2/5 p-4 my-8 flex flex-col lg:flex-row justify-center items-center gap-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{codeCupom}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {image && (
        <Image
          class="w-full lg:w-1/2 object-fit"
          sizes="(max-width: 150px) 100vw, 30vw"
          src={image}
          alt="Cupom"
          width={267}
          height={178}
          decoding="async"
          loading="lazy"
        />
      )}
    </div>
  );
}
