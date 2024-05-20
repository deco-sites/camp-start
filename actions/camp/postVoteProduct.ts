import { AppContext } from "deco-sites/camp-start/apps/site.ts";

export interface ProductRecord {
  total: number;
  product: number;
}

export interface Props {
  productId: string;
}

//* loader in block
const loader = async (
  props: Props,
  _req: unknown,
  _ctx: AppContext,
): Promise<ProductRecord | { status: "Failure" }> => {
  //? Registra um voto na API.
  const apiResponse = await fetch(
    "https://camp-api.deco.cx/event/",
    {
      method: "POST",
      headers: new Headers({
        "x-api-key": "camp-start",
        "content-type": "application/json",
        "accept": "application/json",
      }),
      body: JSON.stringify({
        productId: props.productId,
      }),
    },
  );

  if (apiResponse.ok) {
    const votes = await apiResponse.json() as ProductRecord;
    // console.log("post product vote =>", apiResponse);

    return votes;
  }

  //? caso de erro
  return { status: "Failure" };
};

export default loader;
