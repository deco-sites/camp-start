import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  /** @title Escola o nome da campanha */
  campaign: string;
  /** @title Escolha a chave do matcher */
  param: string;
}

export default function Utm({ campaign, param }: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);
  return url.searchParams.get(param) === campaign;
}
