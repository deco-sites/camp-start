import { AppContext } from "deco-sites/camp-start/apps/site.ts";
import { redirect } from "deco/mod.ts";

export interface TotalVotes {
  total: number;
}

//* loader in block
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<TotalVotes | null> => {
  //? Busca o totals de votos da API.

  const apiResponse = await fetch(
    "https://camp-api.deco.cx/events",
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
    ctx.response.headers.append("Total-Votes", "Not Found");
    ctx.response.status = 404;
    // redirecionamenro de página
    redirect(new URL("/quem-somos", url));
    return null;
  }
  const votes = await apiResponse.json() as TotalVotes;

  // console.log("=====>", votes);

  return votes;
};

export default loader;
