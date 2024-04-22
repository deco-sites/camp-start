import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /** @title Teste de Partials */
  title: string;
}

export default function PartialImageGallery({ title }: Props) {
  return (
    <div class="flex flex-row justify-center">
      <button
        class="btn"
        {...usePartialSection({ props: { title: "MUDOU!" } })}
      >
        {title}
      </button>
    </div>
  );
}
