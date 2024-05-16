import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { redirect } from "deco/mod.ts";

export interface Props {
  productId: number;
}

export interface ProductTotalVotes {
  product: number;
}

//* loader in block
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductTotalVotes | null> => {
  //? Busca o totals de votos de um produto da API.
  // const productId = url.searchParams.get("id");

  const { productId } = props;

  const apiResponse = await fetch(
    `https://camp-api.deco.cx/event/${productId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": "camp-start",
      },
    },
  );

  //? caso de erro
  const url = new URL(req.url);
  if (!apiResponse.ok) {
    ctx.response.headers.append("Total-Product-Votes", "Not Found");
    ctx.response.status = 404;
    // redirecionamenro de página
    redirect(new URL("/quem-somos", url));
    return null;
  }
  const votes = await apiResponse.json() as ProductTotalVotes;

  // console.log("=====>", votes);

  return votes;
};

export default loader;
