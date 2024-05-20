import { AppContext } from "deco-sites/camp-start/apps/site.ts";

export interface Props {
  productId: string;
}

export interface ProductTotalVotes {
  product: string;
}

//* loader in block
const loader = async (
  props: Props,
  _req: unknown,
  ctx: AppContext,
): Promise<ProductTotalVotes | { status: "Failure" }> => {
  //? Busca o total de votos de um produto da API.
  const { productId } = props;

  const apiResponse = await fetch(
    `https://camp-api.deco.cx/event/${productId}`,
    {
      method: "GET",
      headers: new Headers({
        "x-api-key": "camp-start",
      }),
    },
  );

  //? caso de erro
  if (!apiResponse.ok) {
    ctx.response.headers.append("Total-Product-Votes", "Not Found");
    ctx.response.status = 404;
    return { status: "Failure" };
  }
  const votes = await apiResponse.json() as ProductTotalVotes;

  // console.log("get productVotes =====>", votes);

  return votes;
};

export default loader;
