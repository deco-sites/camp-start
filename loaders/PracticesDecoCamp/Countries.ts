import { AppContext } from "deco-sites/camp-start/apps/site.ts";

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
  /** @title Limite de bandeiras de países */
  limit?: number;
}

//* loader in block
const loader = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<Country[]> => {
  //? Pega o parâmetro limit da prop.
  const limit = props.limit ?? 9;

  //? Busca os países da API.
  const countriesResponse = await fetch(
    "https://api.sampleapis.com/countries/countries",
  );
  let allCountries = await countriesResponse.json() as Country[];

  //? Embaralha os países.
  allCountries = shuffleArray(allCountries);

  const countries = allCountries.slice(0, limit);

  // console.log("=====>", countries);

  return countries as Country[];
};

export default loader;
