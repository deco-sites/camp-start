import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /** @title Teste de Partials */
  title: string;
}

export default function PartialImageGallery(props: Props) {
  return (
    <div class="flex flex-row justify-center">
      <h2 class="text-center">{props.title}</h2>
      <button
        class="btn btn-primary"
        {...usePartialSection({ props: { title: "MUDOU!" } })}
      >
        Click me!
      </button>
    </div>
  );
}
