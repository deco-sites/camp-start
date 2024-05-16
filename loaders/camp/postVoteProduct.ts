import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { redirect } from "deco/mod.ts";

export interface ProductRecord {
  total: number;
  product: number;
}

export interface Props {
  productID: number;
}

//* loader in block
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductRecord | null> => {
  //? Registra um voto na API.

  const apiResponse = await fetch(
    `https://camp-api.deco.cx/events`,
    {
      method: "POST",
      headers: {
        "x-api-key": "camp-start",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        product: props.productID,
      }),
    },
  );

  //? caso de erro
  const url = new URL(req.url);
  if (!apiResponse.ok) {
    ctx.response.headers.append("Record-Votes", "Failure");
    ctx.response.status = 404;
    // redirecionamenro de página
    redirect(new URL("/quem-somos", url));
    return null;
  }

  const votes = await apiResponse.json() as ProductRecord;

  // console.log("=====>", votes);

  return votes;
};

export default loader;
