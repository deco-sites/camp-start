import { AppContext } from "deco-sites/camp-start/apps/site.ts";

export interface Props {
  valor: string;
}

// anatomia de um loader

// geralmente é usado para fazer requisições para a API, e leitura de dados
// lembrar de export o loader
const loader = async (props: Props, req: Request, ctx: AppContext) => {
};

export default loader;
