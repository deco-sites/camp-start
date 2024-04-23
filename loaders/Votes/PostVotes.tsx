import { AppContext } from "deco-sites/camp-start/apps/site.ts";

export interface Props {
  productId: string;
}

export type ResponseResult = {
  total: number;
  product: number;
} | null;

export default async function loader(
  props: Props,
  _req: Request,
  _ctx: AppContext,
) {
  const { productId } = props;

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    body: JSON.stringify({
      productId: productId,
    }),
    headers: {
      "x-api-key": "camp-start",
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());

  if (!response) {
    return null;
  }

  return response;
}
