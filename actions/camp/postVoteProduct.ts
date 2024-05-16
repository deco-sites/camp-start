import { AppContext } from "deco-sites/camp-start/apps/site.ts";

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
  _req: unknown,
  _ctx: AppContext,
): Promise<ProductRecord | { status: "Failure" }> => {
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
  if (apiResponse.ok) {
    const votes = await apiResponse.json() as ProductRecord;
    return votes;
  }

  return { status: "Failure" };
};

export default loader;
