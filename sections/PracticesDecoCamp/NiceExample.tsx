import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { SectionProps } from "deco/mod.ts";
// import { Secret } from "apps/website/loaders/secret.ts";

//^ Função para embaralhar um array de elementos.
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; //* create a copy of the array to avoid mutating the original.
  for (let i = newArray.length - 1; i > 0; i--) {
    const N1 = Math.floor(Math.random() * (i + 1)); //* Generate a random index between 0 and i.
    //* Swap the elements at the index i and N1 indexes.
    [newArray[i], newArray[N1]] = [newArray[N1], newArray[i]];
  }
  return newArray;
}

export interface Country {
  name: string;
  media: {
    flag: string;
  };
  id: string;
}

export interface Props {
  title: string;
  // limit?: number;
  // secret: Secret;
}

//^ módulo de section sem loader.
// props são passadas diretamente para o componente. props -> section.

//^ módulo de section com loader.
// props são passadas para o loader, que retorna um objeto com as props que serão passadas para o componente. props -> loader inline -> section.

// inlined loader
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  //? Pega o parâmetro limit da prop.
  // const limit = props.limit ?? 9;

  //? Pega o parâmetro limit da query string da URL.
  // const url = new URL(req.url);

  // const limitString = url.searchParams.get("limit") ?? "9";
  // const limit = Number(limitString);

  //? Pega o parâmetro limit do contexto.
  const limit = ctx.limit?.limitNumber ?? 9;

  // const secretValue = props?.secret?.get() ?? "9";
  // // Use o secret aqui
  // const limit = Number(secretValue);

  //? Busca os países da API.
  const countriesResponse = await fetch(
    "https://api.sampleapis.com/countries/countries",
  );
  let allCountries = await countriesResponse.json() as Country[];

  //? Embaralha os países.
  allCountries = shuffleArray(allCountries);

  const countries = allCountries.slice(0, limit);

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