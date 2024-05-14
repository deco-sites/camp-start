import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { SectionProps } from "deco/mod.ts";

export interface Country {
  name: string;
  media: {
    flag: string;
  };
  id: string;
}

export interface Props {
  title: string;
}

//^ módulo de section sem loader.
// props são passadas diretamente para o componente. props -> section.

//^ módulo de section com loader.
// props são passadas para o loader, que retorna um objeto com as props que serão passadas para o componente. props -> loader inline -> section.

// inlined loader
export const loader = async (props: Props, req: Request, _ctx: AppContext) => {
  const countriesResponse = await fetch(
    "https://api.sampleapis.com/countries/countries",
  );
  const countries = await countriesResponse.json() as Country[];
  // console.log(countries);

  return {
    ...props,
    countries,
  };
};

export default function NiceExample(
  { title, countries }: SectionProps<typeof loader>,
) {
  return (
    <div class="flex flex-col items-center w-[500px] mx-auto gap-4 p-16">
      <h1 class="p-10 text-lg">{title}</h1>
      {countries.map((country) => (
        <div class="rounded-lg w-full border flex gap-4 items-center bg-base-300 p-4">
          <img
            class="h-12"
            src={country.media.flag}
            alt={`${country.name}'s Flag`}
          />
          <span class="text-sm">{country.name}</span>
        </div>
      ))}
    </div>
  );
}
