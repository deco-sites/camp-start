import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { redirect } from "deco/mod.ts";

export interface CountryDetails {
  name: string;
  capital: string;
  population: number;
  media: {
    flag: string;
  };
  id: string;
}

//* loader in block
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<CountryDetails | null> => {
  //? Busca o país da API.
  const url = new URL(req.url);
  const countryId = url.searchParams.get("id");

  const countryResponse = await fetch(
    `https://api.sampleapis.com/countries/countries/${countryId}`,
  );

  //? caso de erro
  if (!countryResponse.ok) {
    ctx.response.headers.append("Country-Info", "Not Found");
    ctx.response.status = 404;
    // redirecionamenro de página
    redirect(new URL("/quem-somos", url));
    return null;
  }
  const country = await countryResponse.json() as CountryDetails;

  // console.log("=====>", country);

  return country;
};

export default loader;
