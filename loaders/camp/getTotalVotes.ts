import { AppContext } from "deco-sites/camp-start/apps/site.ts";

export interface TotalVotes {
  total: number;
}

//* loader in block
const loader = async (
  _props: null,
  _req: Request,
  ctx: AppContext,
): Promise<TotalVotes | { status: "Failure" }> => {
  //? Busca o total de votos da API.
  const apiResponse = await fetch(
    "https://camp-api.deco.cx/events",
    {
      method: "GET",
      headers: new Headers({
        "x-api-key": "camp-start",
      }),
    },
  );

  //? caso de erro
  if (!apiResponse.ok) {
    ctx.response.headers.append("Total-Votes", "Not Found");
    ctx.response.status = 404;
    return { status: "Failure" };
  }
  const votes = await apiResponse.json() as TotalVotes;

  // console.log("get totalVotes ===>", votes);

  return votes;
};

export default loader;
